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

## Requirements
* macOS
* Node.js & npm (for unpacking and repacking the ASAR archive)
* Google Antigravity installed in `/Applications/Antigravity.app`

## How to Use
1. Clone this repository:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Grant execution permission to the shell script:
   ```bash
   chmod +x patch.sh
   ```
3. Run the installer:
   ```bash
   ./patch.sh
   ```
4. Restart your Antigravity application.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
