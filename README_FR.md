# Correctif de région et de langue pour Antigravity

Un outil automatisé pour patcher et contourner l'erreur de restriction de localisation/région dans l'application de bureau Google Antigravity pour macOS.

* [English documentation](README.md)

---

## Introduction
Ce correctif modifie l'archive locale `app.asar` à l'intérieur de l'application de bureau Antigravity. Il usurpe le fuseau horaire et la langue de la fenêtre du navigateur sur le frontend et injecte les variables d'environnement correspondantes dans le processus du serveur de langue basé sur Go. Cela empêche l'application cliente d'afficher des avertissements de blocage de région (par exemple, "Désolé, ce compte n'est pas éligible pour utiliser Antigravity car il n'est pas disponible dans votre pays").

## Configuration requise
* macOS
* Google Antigravity installé (dans `/Applications/Antigravity.app` ou `~/Applications/Antigravity.app`)
* **Node.js n'est PAS requis** (l'installateur utilise automatiquement le Node.js intégré d'Antigravity ou télécharge une version portable si nécessaire).

## Utilisation

### Méthode 1 : Installation en un clic (Recommandé)
Vous n'avez pas besoin de télécharger ou de cloner ce dépôt. Ouvrez simplement votre terminal et lancez la commande suivante :
```bash
curl -sSL https://raw.githubusercontent.com/m4tinbeigi-official/antigravity-locale-patcher/main/patch.sh | bash
```
*(Remarque : Si les privilèges d'écriture sont restreints sur votre dossier d'applications macOS, le script vous demandera automatiquement votre mot de passe pour s'exécuter avec élévation sudo).*

### Méthode 2 : Installation manuelle
1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/m4tinbeigi-official/antigravity-locale-patcher.git
   cd antigravity-locale-patcher
   ```
2. Donnez les privilèges d'exécution et lancez le script :
   ```bash
   chmod +x patch.sh
   ./patch.sh
   ```
3. Redémarrez votre application Antigravity.

## Licence
Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
