# Antigravity Regions- und Gebietsschema-Patcher

Ein automatisiertes Tool zum Patchen und Umgehen des Standort-/Regionsbeschränkungsfehlers in der Google Antigravity-Desktop-Anwendung für macOS.

* [English documentation](README.md)

---

## Einführung
Dieser Patcher modifiziert das lokale `app.asar`-Archiv innerhalb der Antigravity-Desktop-Anwendung. Er täuscht die Zeitzone und das Gebietsschema des Browserfensters im Frontend vor und injiziert entsprechende Umgebungsvariablen in den Go-basierten Language-Server-Prozess. Dies verhindert, dass die Client-Anwendung Warnungen zur Regionssperre ausgibt (z. B. „Es tut uns leid, dieses Konto ist nicht zur Nutzung von Antigravity berechtigt, da es an Ihrem Standort derzeit nicht verfügbar ist“).

## Anforderungen
* macOS
* Google Antigravity installiert (unter `/Applications/Antigravity.app` oder `~/Applications/Antigravity.app`)
* **Node.js ist NICHT erforderlich** (das Installationsprogramm greift automatisch auf das integrierte Node.js von Antigravity zurück oder lädt bei Bedarf ein portables Node.js herunter).

## Verwendung
1. Klonen Sie dieses Repository:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Erteilen Sie dem Skript Ausführungsrechte:
   ```bash
   chmod +x patch.sh
   ```
3. Führen Sie das Installationsprogramm aus:
   ```bash
   ./patch.sh
   ```
4. Starten Sie Ihre Antigravity-Anwendung neu.

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.
