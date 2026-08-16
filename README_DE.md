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

### Methode 1: Ein-Klick-Installation (Empfohlen)
Sie müssen dieses Repository nicht herunterladen oder klonen. Öffnen Sie einfach Ihr Terminal und führen Sie den folgenden Befehl aus:
```bash
curl -sSL https://raw.githubusercontent.com/m4tinbeigi-official/antigravity-locale-patcher/main/patch.sh | bash
```
*(Hinweis: Wenn die Schreibrechte für Ihren macOS-Anwendungsordner eingeschränkt sind, fordert Sie das Installationsskript automatisch zur Eingabe Ihres Passworts auf, um die Berechtigungen über sudo zu erhöhen).*

### Methode 2: Manuelle Installation
1. Klonen Sie dieses Repository:
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Erteilen Sie dem Skript Ausführungsrechte und führen Sie es aus:
   ```bash
   chmod +x patch.sh
   ./patch.sh
   ```
3. Starten Sie Ihre Antigravity-Anwendung neu.

## Lizenz
Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.
