# 🚀 Otomatik GitHub Push Script
Write-Host "🚀 Otomatik GitHub Push Başlatılıyor..." -ForegroundColor Green
Write-Host ""

# Proje dizinine git
Set-Location "c:\Users\xeyal\Desktop\Ai\app"

# Değişiklikleri kontrol et
Write-Host "📋 Değişiklikler kontrol ediliyor..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "➕ Tüm değişiklikler ekleniyor..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Commit yapılıyor..." -ForegroundColor Yellow

# Commit mesajını al
$commitMsg = Read-Host "Commit mesajını girin (varsayılan: Auto update)"
if ([string]::IsNullOrEmpty($commitMsg)) {
    $commitMsg = "Auto update"
}

git commit -m $commitMsg

Write-Host ""
Write-Host "🚀 GitHub'a gönderiliyor..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ GitHub push tamamlandı!" -ForegroundColor Green
Write-Host "🔗 Repository: https://github.com/xeyal9032/ostwindgroup-ai" -ForegroundColor Cyan
Write-Host ""

Read-Host "Devam etmek için Enter'a basın"
