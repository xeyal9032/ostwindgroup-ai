import { conversationService, chatService } from './api';

export const exportService = {
  // Tüm sohbetleri JSON formatında export et
  exportAllConversations: async () => {
    try {
      const conversations = await conversationService.getConversations();
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        conversations: []
      };

      // Her sohbet için mesajları al
      for (const conversation of conversations) {
        try {
          const messages = await conversationService.getMessages(conversation.id);
          exportData.conversations.push({
            ...conversation,
            messages: messages
          });
        } catch (error) {
          console.error(`Sohbet ${conversation.id} mesajları alınamadı:`, error);
          exportData.conversations.push({
            ...conversation,
            messages: []
          });
        }
      }

      return exportData;
    } catch (error) {
      console.error('Export hatası:', error);
      throw error;
    }
  },

  // Tek sohbeti export et
  exportConversation: async (conversationId) => {
    try {
      const conversation = await conversationService.getConversation(conversationId);
      const messages = await conversationService.getMessages(conversationId);
      
      return {
        version: '1.0',
        exportDate: new Date().toISOString(),
        conversation: {
          ...conversation,
          messages: messages
        }
      };
    } catch (error) {
      console.error('Sohbet export hatası:', error);
      throw error;
    }
  },

  // JSON dosyasını indir
  downloadJSON: (data, filename = 'sohbet-yedegi') => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // PDF export (basit)
  exportToPDF: async (conversationId) => {
    try {
      const data = await exportService.exportConversation(conversationId);
      const conversation = data.conversation;
      
      // Basit PDF içeriği oluştur
      let pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length ${conversation.messages.length * 100 + 500}
>>
stream
BT
/F1 12 Tf
50 750 Td
(OstWindGroup AI - Sohbet Yedegi) Tj
0 -20 Td
(Sohbet: ${conversation.title}) Tj
0 -20 Td
(Tarih: ${new Date(conversation.created_at).toLocaleDateString('tr-TR')}) Tj
0 -40 Td`;

      conversation.messages.forEach((message, index) => {
        const role = message.role === 'user' ? 'Kullanici' : 'AI';
        const time = new Date(message.timestamp).toLocaleTimeString('tr-TR');
        const content = message.content.replace(/[()\\]/g, '\\$&');
        
        pdfContent += `
(${index + 1}. ${role} - ${time}) Tj
0 -15 Td
(${content.substring(0, 80)}...) Tj
0 -20 Td`;
      });

      pdfContent += `
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
000000${(conversation.messages.length * 100 + 500).toString().padStart(6, '0')} 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
${conversation.messages.length * 100 + 600}
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sohbet-${conversation.title}-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF export hatası:', error);
      throw error;
    }
  },

  // TXT export
  exportToTXT: async (conversationId) => {
    try {
      const data = await exportService.exportConversation(conversationId);
      const conversation = data.conversation;
      
      let txtContent = `OstWindGroup AI - Sohbet Yedegi
============================

Sohbet: ${conversation.title}
Tarih: ${new Date(conversation.created_at).toLocaleDateString('tr-TR')}
Oluşturulma: ${new Date(conversation.created_at).toLocaleString('tr-TR')}
Güncellenme: ${new Date(conversation.updated_at || conversation.created_at).toLocaleString('tr-TR')}

Mesajlar:
${'='.repeat(50)}

`;

      conversation.messages.forEach((message, index) => {
        const role = message.role === 'user' ? 'Kullanıcı' : 'AI Asistan';
        const time = new Date(message.timestamp).toLocaleString('tr-TR');
        
        txtContent += `${index + 1}. ${role} (${time}):
${message.content}

${'-'.repeat(30)}

`;
      });

      const blob = new Blob([txtContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sohbet-${conversation.title}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('TXT export hatası:', error);
      throw error;
    }
  },

  // Import işlemi
  importConversations: async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          if (!data.version || !data.conversations) {
            throw new Error('Geçersiz dosya formatı');
          }

          const importedCount = data.conversations.length;
          const results = [];

          for (const conversationData of data.conversations) {
            try {
              // Yeni sohbet oluştur
              const newConversation = await conversationService.createConversation();

              // Mesajları ekle (simulated - backend'de mesaj kaydetme endpoint'i yok)
              if (conversationData.messages && conversationData.messages.length > 0) {
                // Mesajları local storage'a kaydet (geçici çözüm)
                const existingData = JSON.parse(localStorage.getItem('imported_messages') || '{}');
                existingData[newConversation.id] = conversationData.messages;
                localStorage.setItem('imported_messages', JSON.stringify(existingData));
              }

              results.push({
                originalId: conversationData.id,
                newId: newConversation.id,
                title: conversationData.title,
                messageCount: conversationData.messages?.length || 0,
                success: true
              });
            } catch (error) {
              results.push({
                originalId: conversationData.id,
                title: conversationData.title,
                error: error.message,
                success: false
              });
            }
          }

          resolve({
            importedCount,
            totalCount: data.conversations.length,
            results
          });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Dosya okunamadı'));
      reader.readAsText(file);
    });
  }
};
