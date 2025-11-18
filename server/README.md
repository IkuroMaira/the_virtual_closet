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

2. Créer l'environnement virtuel
```bash
python -m venv .venv
```

3. Activer l'environnement virtuel
Pour Mac/Linux :
```bash
source .venv/bin/activate
```

Pour Windows :
```bash
source .venv/Scripts/activate
```

4. Mettre à jour pip
```bash
python -m pip install --upgrade pip
```

## Installation des dépendances
5. Installer toutes les dépendances requises
```bash
pip install -r requirements.txt
```

## Configuration
6. Créer un fichier `.env` à la racine du projet avec vos identifiants Supabase :
```env
SUPABASE_URL=votre_url_supabase
SUPABASE_KEY=votre_clé_supabase
```

## Lancer l'application
7. Démarrer le serveur FastAPI
```bash
fastapi dev main.py
```

L'API sera accessible sur : http://localhost:8000
Documentation automatique : http://localhost:8000/docs