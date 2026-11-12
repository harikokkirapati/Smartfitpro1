@echo off
cd /d "%~dp0"
title Pushing SmartFit Pro to GitHub
echo ========================================================
echo    Pushing SmartFit Pro to GitHub Repository
echo ========================================================
echo Target: https://github.com/harikokkirapati/Smartfitpro1.git
echo.
echo Connecting to GitHub and uploading all 33 files and images...
echo (If a GitHub sign-in window opens, click Authorize/Sign-in)
echo.
git push -u origin main --force
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================================
    echo [SUCCESS] Your project and images are now LIVE on GitHub!
echo Visit: https://github.com/harikokkirapati/Smartfitpro1
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo [NOTE] Please sign in with your GitHub account above.
    echo ========================================================
)
pause
