# 🗄️ The Virtual Closet — Backend

> Pour plus de détails sur le projet, consultez le [Wiki](https://github.com/IkuroMaira/the_virtual_closet/wiki)

Stack : **FastAPI** · **SQLModel** · **Alembic** · **PostgreSQL** · **rembg**

## Prérequis

| Composant  | Version recommandée | Vérification           |
|------------|---------------------|------------------------|
| Python     | 3.12+               | `python --version`     |
| PostgreSQL | 15 ou 16            | `psql --version`       |

## Installation

### 1. Environnement virtuel

```bash
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
source .venv/Scripts/activate  # Windows
python -m pip install --upgrade pip
```

### 2. Dépendances

```bash
pip install -r requirements.txt -r requirements-dev.txt
```

### 3. Base de données locale

```bash
createdb virtual_closet
```

Vérifier la création :
```bash
psql -l
```

### 4. Variables d'environnement

Créer un fichier `.env` à la racine de `server/` :

```env
ENV='dev'
DATABASE_LOCAL='postgresql://votre_username:votre_mot_de_passe@localhost:5432/virtual_closet'
DATABASE_URL_PROD='votre_url_postgresql_supabase'
```

> **Note** : Si votre utilisateur PostgreSQL local n'a pas de mot de passe, laissez le champ vide :
> `postgresql://votre_username:@localhost:5432/virtual_closet`

> **Note** : Le fichier `.env` n'est jamais poussé sur le dépôt distant (il est dans le `.gitignore`). En production, les variables d'environnement sont configurées dans le dashboard de la plateforme d'hébergement.

| Variable `ENV` | Comportement |
|---|---|
| `dev`  | Connexion à PostgreSQL local |
| `prod` | Connexion à PostgreSQL Supabase |

### 5. Migrations

```bash
alembic upgrade head
```

### 6. Lancer le serveur

```bash
fastapi dev main.py
# ou
uvicorn main:app --reload
```

API disponible sur `http://localhost:8000`<br>
Documentation interactive (Swagger UI) : `http://localhost:8000/docs`

## Gestion des migrations avec Alembic

> Wiki : https://github.com/IkuroMaira/the_virtual_closet/wiki/BACK-%E2%80%90-Alembic-:-Guide-des-migrations

```bash
# Générer une migration après modification d'un modèle
alembic revision --autogenerate -m "description de la migration"

# Appliquer les migrations
alembic upgrade head

# Revenir à la migration précédente
alembic downgrade -1
```

## Linters

```bash
# Analyse statique du code
python -m flake8 app/

# Analyse statique des types
python -m mypy app/
```
