import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { 
  Download, 
  Upload, 
  FileText, 
  FileJson, 
  File,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { exportService } from '../services/exportService';
import { useNotifications } from './NotificationBell';

const ExportImport = ({ conversations, currentConversationId }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const { showNotification } = useNotifications();

  const handleExportAll = async () => {
    setIsExporting(true);
    try {
      const data = await exportService.exportAllConversations();
      exportService.downloadJSON(data, 'tum-sohbetler');
      showNotification('Export Başarılı', {
        message: `${data.conversations.length} sohbet JSON formatında indirildi`,
        type: 'success'
      });
    } catch (error) {
      showNotification('Export Hatası', {
        message: 'Sohbetler export edilemedi: ' + error.message,
        type: 'error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportCurrent = async () => {
    if (!currentConversationId) {
      showNotification('Uyarı', {
        message: 'Export edilecek sohbet seçin',
        type: 'warning'
      });
      return;
    }

    setIsExporting(true);
    try {
      const data = await exportService.exportConversation(currentConversationId);
      exportService.downloadJSON(data, 'sohbet');
      showNotification('Export Başarılı', {
        message: 'Seçili sohbet JSON formatında indirildi',
        type: 'success'
      });
    } catch (error) {
      showNotification('Export Hatası', {
        message: 'Sohbet export edilemedi: ' + error.message,
        type: 'error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (!currentConversationId) {
      showNotification('Uyarı', {
        message: 'PDF export edilecek sohbet seçin',
        type: 'warning'
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportService.exportToPDF(currentConversationId);
      showNotification('PDF Export Başarılı', {
        message: 'Sohbet PDF formatında indirildi',
        type: 'success'
      });
    } catch (error) {
      showNotification('PDF Export Hatası', {
        message: 'PDF oluşturulamadı: ' + error.message,
        type: 'error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportTXT = async () => {
    if (!currentConversationId) {
      showNotification('Uyarı', {
        message: 'TXT export edilecek sohbet seçin',
        type: 'warning'
      });
      return;
    }

    setIsExporting(true);
    try {
      await exportService.exportToTXT(currentConversationId);
      showNotification('TXT Export Başarılı', {
        message: 'Sohbet TXT formatında indirildi',
        type: 'success'
      });
    } catch (error) {
      showNotification('TXT Export Hatası', {
        message: 'TXT oluşturulamadı: ' + error.message,
        type: 'error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      showNotification('Hata', {
        message: 'Sadece JSON dosyaları desteklenir',
        type: 'error'
      });
      return;
    }

    setIsImporting(true);
    setImportResults(null);

    try {
      const results = await exportService.importConversations(file);
      setImportResults(results);
      
      const successCount = results.results.filter(r => r.success).length;
      showNotification('Import Tamamlandı', {
        message: `${successCount}/${results.totalCount} sohbet başarıyla içe aktarıldı`,
        type: successCount > 0 ? 'success' : 'error'
      });
    } catch (error) {
      showNotification('Import Hatası', {
        message: 'Dosya içe aktarılamadı: ' + error.message,
        type: 'error'
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export (Dışa Aktar)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 gap-2">
            <Button
              onClick={handleExportAll}
              disabled={isExporting || conversations.length === 0}
              className="justify-start"
              variant="outline"
              size="sm"
            >
              <FileJson className="w-4 h-4 mr-2" />
              Tüm Sohbetler (JSON)
              {isExporting && <Loader2 className="w-3 h-3 ml-2 animate-spin" />}
            </Button>

            <Button
              onClick={handleExportCurrent}
              disabled={isExporting || !currentConversationId}
              className="justify-start"
              variant="outline"
              size="sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              Seçili Sohbet (JSON)
              {isExporting && <Loader2 className="w-3 h-3 ml-2 animate-spin" />}
            </Button>

            <Button
              onClick={handleExportPDF}
              disabled={isExporting || !currentConversationId}
              className="justify-start"
              variant="outline"
              size="sm"
            >
              <File className="w-4 h-4 mr-2" />
              Seçili Sohbet (PDF)
              {isExporting && <Loader2 className="w-3 h-3 ml-2 animate-spin" />}
            </Button>

            <Button
              onClick={handleExportTXT}
              disabled={isExporting || !currentConversationId}
              className="justify-start"
              variant="outline"
              size="sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              Seçili Sohbet (TXT)
              {isExporting && <Loader2 className="w-3 h-3 ml-2 animate-spin" />}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• JSON: Tüm verileri korur, geri yüklenebilir</p>
            <p>• PDF: Okunabilir format, yazdırılabilir</p>
            <p>• TXT: Basit metin formatı</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import (İçe Aktar)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <Button
              onClick={() => document.getElementById('import-file').click()}
              disabled={isImporting}
              className="w-full justify-start"
              variant="outline"
              size="sm"
            >
              <Upload className="w-4 h-4 mr-2" />
              JSON Dosyası Seç
              {isImporting && <Loader2 className="w-3 h-3 ml-2 animate-spin" />}
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• Sadece JSON formatı desteklenir</p>
            <p>• Mevcut sohbetleriniz etkilenmez</p>
            <p>• Yeni sohbetler olarak eklenir</p>
          </div>

          {importResults && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <h4 className="text-sm font-medium mb-2">Import Sonuçları:</h4>
              <div className="space-y-1 text-xs">
                <p>Toplam: {importResults.totalCount}</p>
                <p>Başarılı: {importResults.results.filter(r => r.success).length}</p>
                <p>Başarısız: {importResults.results.filter(r => !r.success).length}</p>
              </div>
              
              {importResults.results.length > 0 && (
                <div className="mt-2 max-h-32 overflow-y-auto">
                  {importResults.results.map((result, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs">
                      {result.success ? (
                        <CheckCircle className="w-3 h-3 text-green-600" />
                      ) : (
                        <AlertCircle className="w-3 h-3 text-red-600" />
                      )}
                      <span className="truncate">
                        {result.title || `Sohbet ${result.originalId}`}
                        {result.messageCount && ` (${result.messageCount} mesaj)`}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExportImport;
