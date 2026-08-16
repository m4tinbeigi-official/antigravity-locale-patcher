# Parche de Región y Configuración Regional para Antigravity

Una herramienta automatizada para parchear y omitir el error de restricción de ubicación/región en la aplicación de escritorio Google Antigravity para macOS.

* [English documentation](README.md)

---

## Introducción
Este parche modifica el archivo local `app.asar` dentro de la aplicación de escritorio Antigravity. Simula la zona horaria y la configuración regional de la ventana del navegador en el frontend e inyecta las variables de entorno correspondientes en el proceso del servidor de lenguaje basado en Go. Esto evita que la aplicación cliente muestre advertencias de bloqueo de región (por ejemplo, "Lo sentimos, esta cuenta no es apta para usar Antigravity porque no está disponible en su ubicación").

## Requisitos
* macOS
* Node.js y npm (para desempaquetar y volver a empaquetar el archivo ASAR)
* Google Antigravity instalado en `/Applications/Antigravity.app`

## Cómo usar
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

## Licencia
Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
