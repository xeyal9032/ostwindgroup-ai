from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import openai
import google.generativeai as genai
import io
import base64
from google.cloud import speech

ROOT_DIR = Path(__file__).parent
# load_dotenv(ROOT_DIR / '.env')  # Commented out to avoid .env file

# MongoDB connection (optional - will work without it)
mongo_url = os.environ.get('MONGO_URL', '')
db_name = os.environ.get('DB_NAME', 'ostwindgroup_ai')

if mongo_url and mongo_url != '':
    try:
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
        print(f"Connected to MongoDB: {mongo_url}/{db_name}")
    except Exception as e:
        print(f"MongoDB connection failed: {e}")
        print("Running without database - using in-memory storage")
        client = None
        db = None
else:
    print("No MongoDB URL provided - using in-memory storage")
    client = None
    db = None

# AI Configuration
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
GOOGLE_AI_API_KEY = os.environ.get('GOOGLE_AI_API_KEY', '')

# OpenAI Configuration
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY
    print("OpenAI API key configured")

# Google AI Configuration
if GOOGLE_AI_API_KEY:
    genai.configure(api_key=GOOGLE_AI_API_KEY)
    print("Google AI API key configured")
else:
    print("No AI API key provided - using demo responses")

# Create the main app without a prefix
app = FastAPI(title="OstWindGroup AI API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# In-memory storage for when MongoDB is not available
in_memory_conversations = []
in_memory_messages = []

# Define Models
class Message(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    conversation_id: str
    role: str  # 'user' or 'assistant'
    content: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MessageCreate(BaseModel):
    conversation_id: str
    content: str

class Conversation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ConversationCreate(BaseModel):
    title: str = "Yeni Sohbet"

class ChatRequest(BaseModel):
    conversation_id: Optional[str] = None
    message: str

class ChatResponse(BaseModel):
    conversation_id: str
    user_message: Message
    assistant_message: Message

# Helper functions for data storage
async def save_conversation(conversation):
    if db is not None:
        doc = conversation.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.conversations.insert_one(doc)
    else:
        in_memory_conversations.append(conversation.model_dump())

async def get_conversations():
    if db is not None:
        conversations = await db.conversations.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
        for conv in conversations:
            if isinstance(conv['created_at'], str):
                conv['created_at'] = datetime.fromisoformat(conv['created_at'])
        return conversations
    else:
        return sorted(in_memory_conversations, key=lambda x: x['created_at'], reverse=True)

async def delete_conversation(conversation_id):
    if db is not None:
        result = await db.conversations.delete_one({"id": conversation_id})
        await db.messages.delete_many({"conversation_id": conversation_id})
        return result.deleted_count > 0
    else:
        global in_memory_conversations, in_memory_messages
        in_memory_conversations = [c for c in in_memory_conversations if c['id'] != conversation_id]
        in_memory_messages = [m for m in in_memory_messages if m['conversation_id'] != conversation_id]
        return True

async def save_message(message):
    if db is not None:
        doc = message.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        await db.messages.insert_one(doc)
    else:
        in_memory_messages.append(message.model_dump())

async def get_messages(conversation_id):
    if db is not None:
        messages = await db.messages.find({"conversation_id": conversation_id}, {"_id": 0}).sort("timestamp", 1).to_list(1000)
        for msg in messages:
            if isinstance(msg['timestamp'], str):
                msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
        return messages
    else:
        return sorted([m for m in in_memory_messages if m['conversation_id'] == conversation_id], 
                     key=lambda x: x['timestamp'])

# Routes
@api_router.get("/")
async def root():
    return {"message": "OstWindGroup AI API", "status": "running"}

@api_router.post("/conversations", response_model=Conversation)
async def create_conversation(input: ConversationCreate):
    conversation = Conversation(title=input.title)
    await save_conversation(conversation)
    return conversation

@api_router.get("/conversations", response_model=List[Conversation])
async def get_conversations_endpoint():
    conversations = await get_conversations()
    return conversations

@api_router.delete("/conversations/{conversation_id}")
async def delete_conversation_endpoint(conversation_id: str):
    success = await delete_conversation(conversation_id)
    if not success:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {"message": "Conversation deleted"}

@api_router.get("/conversations/{conversation_id}/messages", response_model=List[Message])
async def get_messages_endpoint(conversation_id: str):
    messages = await get_messages(conversation_id)
    return messages

@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Create conversation if not exists
        conversation_id = request.conversation_id
        if not conversation_id:
            # Extract first 50 chars as title
            title = request.message[:50] + "..." if len(request.message) > 50 else request.message
            conversation = Conversation(title=title)
            conversation_id = conversation.id
            await save_conversation(conversation)
        
        # Save user message
        user_message = Message(
            conversation_id=conversation_id,
            role="user",
            content=request.message
        )
        await save_message(user_message)
        
        # Get conversation history for context
        history = await get_messages(conversation_id)
        
        # Prepare messages for OpenAI
        messages = [
            {"role": "system", "content": "Sen OstWindGroup AI, kullanıcılara yardımcı olan zeki bir asistansın. Her zaman Türkçe konuş ve yardımcı ol."}
        ]
        
        # Add conversation history (last 10 messages for context)
        for msg in history[-10:]:
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })
        
        # Get AI response
        ai_response = ""
        
        # Try Google AI (Gemini) first
        if GOOGLE_AI_API_KEY:
            try:
                model = genai.GenerativeModel('gemini-2.5-flash')
                
                # Prepare conversation context
                conversation_text = "Sen OstWindGroup AI, kullanıcılara yardımcı olan zeki bir asistansın. Her zaman Türkçe konuş ve yardımcı ol.\n\n"
                
                # Add conversation history
                for msg in messages[-10:]:  # Last 10 messages for context
                    if msg["role"] == "user":
                        conversation_text += f"Kullanıcı: {msg['content']}\n"
                    elif msg["role"] == "assistant":
                        conversation_text += f"Asistan: {msg['content']}\n"
                
                # Generate response
                response = model.generate_content(conversation_text)
                ai_response = response.text
                
            except Exception as e:
                logging.error(f"Google AI API error: {str(e)}")
                # Fallback to OpenAI if Google AI fails
                if OPENAI_API_KEY:
                    try:
                        client = openai.OpenAI(api_key=OPENAI_API_KEY)
                        response = client.chat.completions.create(
                            model="gpt-3.5-turbo",
                            messages=messages,
                            max_tokens=1000,
                            temperature=0.7
                        )
                        ai_response = response.choices[0].message.content
                    except Exception as e2:
                        logging.error(f"OpenAI API error: {str(e2)}")
                        ai_response = f"Üzgünüm, AI servisinde bir hata oluştu: {str(e2)}"
                else:
                    ai_response = f"Üzgünüm, AI servisinde bir hata oluştu: {str(e)}"
        
        # Try OpenAI if Google AI is not available
        elif OPENAI_API_KEY:
            try:
                client = openai.OpenAI(api_key=OPENAI_API_KEY)
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=messages,
                    max_tokens=1000,
                    temperature=0.7
                )
                ai_response = response.choices[0].message.content
            except Exception as e:
                logging.error(f"OpenAI API error: {str(e)}")
                ai_response = f"Üzgünüm, AI servisinde bir hata oluştu: {str(e)}"
        
        else:
            # Demo response when no API key
            ai_response = f"Merhaba! '{request.message}' mesajınızı aldım. Bu bir demo yanıttır. Gerçek AI entegrasyonu için Google AI veya OpenAI API anahtarı gerekli."
        
        # Save assistant message
        assistant_message = Message(
            conversation_id=conversation_id,
            role="assistant",
            content=ai_response
        )
        await save_message(assistant_message)
        
        return ChatResponse(
            conversation_id=conversation_id,
            user_message=user_message,
            assistant_message=assistant_message
        )
        
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/speech-to-text")
async def speech_to_text(audio_file: UploadFile = File(...)):
    try:
        # Read audio file
        audio_content = await audio_file.read()
        
        # Try Google Cloud Speech-to-Text API
        if GOOGLE_AI_API_KEY:
            try:
                # Initialize Google Cloud Speech client
                client = speech.SpeechClient()
                
                # Configure audio
                audio = speech.RecognitionAudio(content=audio_content)
                config = speech.RecognitionConfig(
                    encoding=speech.RecognitionConfig.AudioEncoding.WEBM_OPUS,
                    sample_rate_hertz=48000,
                    language_code="tr-TR",
                    alternative_language_codes=["en-US"],
                    enable_automatic_punctuation=True,
                )
                
                # Perform speech recognition
                response = client.recognize(config=config, audio=audio)
                
                if response.results:
                    result = response.results[0]
                    if result.alternatives:
                        alternative = result.alternatives[0]
                        return {
                            "text": alternative.transcript,
                            "confidence": alternative.confidence,
                            "language": "tr-TR"
                        }
                
                # If no results, return demo message
                return {
                    "text": "🎤 Sesli mesaj algılandı ancak anlaşılamadı. Lütfen daha net konuşun.",
                    "confidence": 0.0,
                    "language": "tr-TR"
                }
                
            except Exception as e:
                logging.error(f"Google Cloud Speech-to-Text error: {str(e)}")
                # Fallback to demo response
                return {
                    "text": f"🎤 Sesli mesaj algılandı. Google Cloud Speech-to-Text entegrasyonu için API anahtarı gerekli. Hata: {str(e)[:100]}",
                    "confidence": 0.0,
                    "language": "tr-TR"
                }
        else:
            return {
                "text": "🎤 Sesli mesaj algılandı ancak AI servisi yapılandırılmamış.",
                "confidence": 0.0,
                "language": "tr-TR"
            }
            
    except Exception as e:
        logging.error(f"Speech-to-text error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    if client:
        client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)