# Antigravity Locale & Region Patcher

An automated tool to patch and bypass the location/region restriction error in Google Antigravity desktop application for macOS.

---

## Language Selector / انتخاب زبان
- [English](#english)
- [Farsi / فارسی](#farsi---فارسی)
- [Chinese / 中文](#chinese---中文)
- [Russian / Русский](#russian---русский)
- [Spanish / Español](#spanish---español)
- [German / Deutsch](#german---deutsch)
- [French / Français](#french---français)

---

## English

### Introduction
This patcher modifies the local `app.asar` archive inside the Antigravity desktop application. It spoofs the browser window's timezone and locale on the frontend and injects corresponding environment variables into the Go-based language server process. This prevents the client application from throwing region-block warnings (e.g., "Sorry, this account is ineligible to use Antigravity because it is not currently available in your location").

### Requirements
* macOS
* Node.js & npm (for unpacking and repacking the ASAR archive)
* Google Antigravity installed in `/Applications/Antigravity.app`

### How to Use
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

---

## Farsi - فارسی

### معرفی
این اسکریپت فایل آرشیو محلی `app.asar` نرم‌افزار دسکتاپ Antigravity را ویرایش می‌کند. این ابزار با شبیه‌سازی (Spoofing) منطقه زمانی و زبان مرورگر در بخش فرانت‌اند و تزریق متغیرهای محیطی متناظر در پروسه بک‌اند سرور زبان، مانع از نمایش ارور عدم دسترسی به دلیل موقعیت جغرافیایی می‌شود.

### پیش‌نیازها
* سیستم‌عامل macOS
* نصب بودن Node.js و npm (جهت استخراج و بسته‌بندی مجدد فایل ASAR)
* نصب بودن برنامه در مسیر پیش‌فرض: `/Applications/Antigravity.app`

### نحوه استفاده
۱. مخزن را کلون کنید:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
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

## Chinese - 中文

### 介绍
此修补程序修改了 Antigravity 桌面应用程序内部的本地 `app.asar` 归档。它在前端伪造浏览器窗口的时区和区域设置，并将相应的环境变量注入到基于 Go 的语言服务器进程中。这可以防止客户端应用程序抛出区域锁定警告（例如，“抱歉，此帐户不符合使用 Antigravity 的条件，因为它目前在您的位置不可用”）。

### 系统要求
* macOS
* Node.js & npm（用于解压和重新打包 ASAR 归档）
* 安装在 `/Applications/Antigravity.app` 中的 Google Antigravity

### 使用方法
1. 克隆此仓库：
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. 授予脚本执行权限：
   ```bash
   chmod +x patch.sh
   ```
3. 运行安装程序：
   ```bash
   ./patch.sh
   ```
4. 重新启动你的 Antigravity 应用程序。

---

## Russian - Русский

### Введение
Этот патч изменяет локальный архив `app.asar` внутри настольного приложения Antigravity. Он подменяет часовой пояс и локаль окна браузера на фронтенде и внедряет соответствующие переменные окружения в процесс языкового сервера на базе Go. Это предотвращает появление предупреждений о блокировке региона в клиентском приложении (например, «К сожалению, этот аккаунт не подходит для использования Antigravity, так как он недоступен в вашем регионе»).

### Требования
* macOS
* Node.js и npm (для распаковки и упаковки архива ASAR)
* Google Antigravity, установленный в `/Applications/Antigravity.app`

### Инструкция по использованию
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Предоставьте права на выполнение скрипта:
   ```bash
   chmod +x patch.sh
   ```
3. Запустите установщик:
   ```bash
   ./patch.sh
   ```
4. Перезапустите приложение Antigravity.

---

## Spanish - Español

### Introducción
Este parche modifica el archivo local `app.asar` dentro de la aplicación de escritorio Antigravity. Simula la zona horaria y la configuración regional de la ventana del navegador en el frontend e inyecta las variables de entorno correspondientes en el proceso del servidor de lenguaje basado en Go. Esto evita que la aplicación cliente muestre advertencias de bloqueo de región (por ejemplo, "Lo sentimos, esta cuenta no es apta para usar Antigravity porque no está disponible en su ubicación").

### Requisitos
* macOS
* Node.js y npm (para desempaquetar y volver a empaquetar el archivo ASAR)
* Google Antigravity instalado en `/Applications/Antigravity.app`

### Cómo usar
1. Clona este repositorio:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Otorga permisos de ejecución al script:
   ```bash
   chmod +x patch.sh
   ```
3. Ejecuta el instalador:
   ```bash
   ./patch.sh
   ```
4. Reinicia tu aplicación Antigravity.

---

## German - Deutsch

### Einführung
Dieser Patcher modifiziert das lokale `app.asar`-Archiv innerhalb der Antigravity-Desktop-Anwendung. Er täuscht die Zeitzone und das Gebietsschema des Browserfensters im Frontend vor und injiziert entsprechende Umgebungsvariablen in den Go-basierten Language-Server-Prozess. Dies verhindert, dass die Client-Anwendung Warnungen zur Regionssperre ausgibt (z. B. „Es tut uns leid, dieses Konto ist nicht zur Nutzung von Antigravity berechtigt, da es an Ihrem Standort derzeit nicht verfügbar ist“).

### Anforderungen
* macOS
* Node.js & npm (zum Entpacken und Wiederverpacken des ASAR-Archivs)
* Google Antigravity installiert unter `/Applications/Antigravity.app`

### Verwendung
1. Klonen Sie dieses Repository:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Erteilen Sie dem Shell-Skript Ausführungsrechte:
   ```bash
   chmod +x patch.sh
   ```
3. Führen Sie das Installationsprogramm aus:
   ```bash
   ./patch.sh
   ```
4. Starten Sie Ihre Antigravity-Anwendung neu.

---

## French - Français

### Introduction
Ce correctif modifie l'archive locale `app.asar` à l'intérieur de l'application de bureau Antigravity. Il usurpe le fuseau horaire et la langue de la fenêtre du navigateur sur le frontend et injecte les variables d'environnement correspondantes dans le processus du serveur de langue basé sur Go. Cela empêche l'application cliente d'afficher des avertissements de blocage de région (par exemple, "Désolé, ce compte n'est pas éligible pour utiliser Antigravity car il n'est pas disponible dans votre pays").

### Configuration requise
* macOS
* Node.js & npm (pour désarchiver et réarchiver le fichier ASAR)
* Google Antigravity installé dans `/Applications/Antigravity.app`

### Utilisation
1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Donnez les permissions d'exécution au script shell :
   ```bash
   chmod +x patch.sh
   ```
3. Lancez l'installateur :
   ```bash
   ./patch.sh
   ```
4. Redémarrez votre application Antigravity.

---

## License / لایسنس
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

این پروژه تحت لایسنس MIT منتشر شده است - برای اطلاعات بیشتر فایل [LICENSE](LICENSE) را مطالعه کنید.
