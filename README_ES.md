# Parche de Región y Configuración Regional para Antigravity

Una herramienta automatizada para parchear y omitir el error de restricción de ubicación/región en la aplicación de escritorio Google Antigravity para macOS.

* [English documentation](README.md)

---

## Introducción
Este parche modifica el archivo local `app.asar` dentro de la aplicación de escritorio Antigravity. Simula la zona horaria y la configuración regional de la ventana del navegador en el frontend e inyecta las variables de entorno correspondientes en el proceso del servidor de lenguaje basado en Go. Esto evita que la aplicación cliente muestre advertencias de bloqueo de región (por ejemplo, "Lo sentimos, esta cuenta no es apta para usar Antigravity porque no está disponible en su ubicación").

## Requisitos
* macOS
* Google Antigravity instalado (en `/Applications/Antigravity.app` o `~/Applications/Antigravity.app`)
* **Node.js NO es requerido** (el instalador utiliza automáticamente el Node.js integrado de Antigravity o descarga una versión portable si es necesario).

## Cómo usar

### Método 1: Instalación con un solo clic (Recomendado)
No necesita descargar o clonar este repositorio. Simplemente abra su terminal y ejecute el siguiente comando:
```bash
curl -sSL https://raw.githubusercontent.com/m4tinbeigi-official/antigravity-locale-patcher/main/patch.sh | bash
```
*(Nota: Si los permisos de escritura están restringidos en su carpeta de aplicaciones de macOS, el script le pedirá automáticamente su contraseña para ejecutarlo con privilegios elevados de sudo).*

### Método 2: Instalación manual
1. Clona este repositorio:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Otorga permisos de ejecución y ejecuta el script:
   ```bash
   chmod +x patch.sh
   ./patch.sh
   ```
3. Reinicia tu aplicación Antigravity.

## Licencia
Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
