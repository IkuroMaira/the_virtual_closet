# VIRTUAL CLOSET
### Mis à jour le 24/10/2025 / Updated on 2025/24/10

# FRENCH VERSION

# Pré-requis avant de lancer le projet :
| Composant  | Version recommandée | Lien | Commande |
|------------|---------------------|---|---|
| Python     | 3.14                | | `python --version` |
| Pip | | | `pip --version` |
| FastAPI    |                     | |
| PostgreSQL | 15 ou 16            | |

# Installation

## Installation de l'environnement virtuel
1. Installer la version 3.14 de Python
2. Mise à jour de pip
```bash
python -m pip install --upgrade pip
```
3. Installer virtualenv
```bash
pip install virtualenv
```

4. Installer l'environnement virtuel
```bash
python -m venv .venv
```

5. Activer l'environnement virtuel
Pour les Mac
```bash
source .venv/bin/activate
```

Pour Windows
```bash
venv\Scripts\activate
```
## Installation de FastAPI
6. Installer FastAPI
```bash
pip install "fastapi[standar]"
```

7. Installer le serveur Uvicorn pour pouvoir faire fonctionner FastAPI
```bash
pip install "uvicorn[standard]"
```

## Lancer FastAPI
```bash
fastapi dev main.py
```