import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';
import { Mic, MicOff, Play, Pause, Square, Volume2 } from 'lucide-react';

const VoiceMessageButton = ({ onVoiceMessage, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer başlat
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Mikrofon erişim hatası:', error);
      alert('Mikrofon erişimi için izin verin');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const sendVoiceMessage = async () => {
    if (audioBlob && onVoiceMessage) {
      try {
        // Convert audio blob to text using backend API
        const formData = new FormData();
        formData.append('audio_file', audioBlob, 'voice_message.wav');
        
        const response = await fetch('http://localhost:8000/api/speech-to-text', {
          method: 'POST',
          body: formData,
        });
        
        const result = await response.json();
        
        // Send the converted text as message
        onVoiceMessage(audioBlob, result.text);
        
      } catch (error) {
        console.error('Speech-to-text error:', error);
        // Fallback to demo message
        onVoiceMessage(audioBlob, "🎤 Sesli mesaj gönderildi (Ses-metin çevirisi başarısız)");
      }
      
      setAudioBlob(null);
      setRecordingTime(0);
    }
  };

  const cancelRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      {!audioBlob ? (
      <Button
        type="button"
        variant={isRecording ? "destructive" : "ghost"}
        size="icon"
        className={`h-7 w-7 transition-all duration-200 rounded-full ${
          isRecording 
            ? "bg-red-500 hover:bg-red-600 text-white" 
            : "hover:bg-primary/10 hover:text-primary"
        }`}
        onClick={isRecording ? stopRecording : startRecording}
        disabled={disabled}
      >
          {isRecording ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </Button>
      ) : (
        <Card className="absolute bottom-10 left-0 z-50 w-64">
          <CardContent className="p-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Sesli Mesaj ({formatTime(recordingTime)})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={cancelRecording}
                >
                  <Square className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={isPlaying ? pauseRecording : playRecording}
                >
                  {isPlaying ? (
                    <Pause className="w-3 h-3 mr-1" />
                  ) : (
                    <Play className="w-3 h-3 mr-1" />
                  )}
                  {isPlaying ? 'Duraklat' : 'Oynat'}
                </Button>
                
                <Button
                  size="sm"
                  onClick={sendVoiceMessage}
                >
                  Gönder
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VoiceMessageButton;
