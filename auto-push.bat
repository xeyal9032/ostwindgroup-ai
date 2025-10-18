@echo off
echo 🚀 Otomatik GitHub Push Başlatılıyor...
echo.

cd /d "c:\Users\xeyal\Desktop\Ai\app"

echo 📋 Değişiklikler kontrol ediliyor...
git status

echo.
echo ➕ Tüm değişiklikler ekleniyor...
git add .

echo.
echo 💾 Commit yapılıyor...
set /p commit_msg="Commit mesajını girin (varsayılan: Auto update): "
if "%commit_msg%"=="" set commit_msg=Auto update

git commit -m "%commit_msg%"

echo.
echo 🚀 GitHub'a gönderiliyor...
git push origin main

echo.
echo ✅ GitHub push tamamlandı!
echo 🔗 Repository: https://github.com/xeyal9032/ostwindgroup-ai
echo.
pause

