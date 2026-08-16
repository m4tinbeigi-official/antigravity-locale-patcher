# Antigravity Locale & Region Patcher

An automated tool to patch and bypass the location/region restriction error in Google Antigravity desktop application for macOS.

---

## Translations / زبان‌های دیگر
This documentation is available in the following languages:
* [Farsi / فارسی](README_FA.md)
* [Chinese / 中文](README_ZH.md)
* [Russian / Русский](README_RU.md)
* [Spanish / Español](README_ES.md)
* [German / Deutsch](README_DE.md)
* [French / Français](README_FR.md)

---

## Introduction
This patcher modifies the local `app.asar` archive inside the Antigravity desktop application. It spoofs the browser window's timezone and locale on the frontend and injects corresponding environment variables into the Go-based language server process. This prevents the client application from throwing region-block warnings (e.g., "Sorry, this account is ineligible to use Antigravity because it is not currently available in your location").

**Apple Silicon (M1/M2/M3/M4) Support:** Modifying an Electron application on Apple Silicon invalidates its signature, causing macOS to kill it on startup. This script automatically re-signs the `Antigravity.app` bundle using an ad-hoc signature at the end of the patch, making it fully compatible with both Intel and M-series Macs without launching issues.

## Requirements
* macOS (Intel or Apple Silicon M-series)
* Google Antigravity installed (in `/Applications/Antigravity.app` or `~/Applications/Antigravity.app`)
* **Node.js is NOT required** (the installer automatically falls back to Antigravity's embedded Node.js or downloads a portable Node.js binary if needed).

## How to Use

### Method 1: One-Click Installation (Recommended)
You don't need to download or clone this repository. Simply open your terminal and run the following command:
```bash
curl -sSL https://raw.githubusercontent.com/m4tinbeigi-official/antigravity-locale-patcher/main/patch.sh | bash
```
*(Note: If write permissions are restricted on your macOS Applications folder, the script will automatically prompt you for your password to elevate privileges).*

### Method 2: Manual Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Grant execution permission and run the script:
   ```bash
   chmod +x patch.sh
   ./patch.sh
   ```
3. Restart your Antigravity application.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
