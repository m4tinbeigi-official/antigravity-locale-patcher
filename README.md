# Antigravity Locale & Region Patcher

An automated tool to patch and bypass the location/region restriction error in Google Antigravity desktop application for macOS.

ابزاری خودکار جهت پچ و دور زدن ارور محدودیت جغرافیایی و ریجن در نسخه دسکتاپ نرم‌افزار گوگل آنتی‌گرویتی برای مک‌او‌اس.

---

## English Documentation

### Introduction
This patcher modifies the local `app.asar` archive inside the Antigravity desktop application. It spoofs the browser window's timezone and locale on the frontend and injects corresponding environment variables into the Go-based language server process. This prevents the client application from throwing region-block warnings (e.g., "Sorry, this account is ineligible to use Antigravity because it is not currently available in your location").

### Requirements
* macOS
* Node.js & npm (for unpacking and repacking the ASAR archive)
* Google Antigravity installed in `/Applications/Antigravity.app`

### How to Use
1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/antigravity-locale-patcher.git
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

---

## راهنمای فارسی

### معرفی
این اسکریپت فایل آرشیو محلی `app.asar` نرم‌افزار دسکتاپ Antigravity را ویرایش می‌کند. این ابزار با شبیه‌سازی (Spoofing) منطقه زمانی و زبان مرورگر در بخش فرانت‌اند و تزریق متغیرهای محیطی متناظر در پروسه بک‌اند سرور زبان، مانع از نمایش ارور عدم دسترسی به دلیل موقعیت جغرافیایی می‌شود.

### پیش‌نیازها
* سیستم‌عامل macOS
* نصب بودن Node.js و npm (جهت استخراج و بسته‌بندی مجدد فایل ASAR)
* نصب بودن برنامه در مسیر پیش‌فرض: `/Applications/Antigravity.app`

### نحوه استفاده
۱. مخزن را کلون کنید:
   ```bash
   git clone https://github.com/<your-username>/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
۲. به اسکریپت اجازه اجرا بدهید:
   ```bash
   chmod +x patch.sh
   ```
۳. پچر را اجرا کنید:
   ```bash
   ./patch.sh
   ```
۴. برنامه Antigravity را به طور کامل ببندید و مجدداً باز کنید.

---

## License / لایسنس
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

این پروژه تحت لایسنس MIT منتشر شده است - برای اطلاعات بیشتر فایل [LICENSE](LICENSE) را مطالعه کنید.
