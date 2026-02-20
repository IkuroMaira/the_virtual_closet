# VIRTUAL CLOSET
### Mis à jour le 15/02/2026 / Updated on 2026/02/15

# FRENCH VERSION

# Pré-requis avant de lancer le projet :
| Composant  | Version recommandée | Lien | Commande           |
|------------|---------------------|------|--------------------|
| Python     | 3.12                |      | `python --version` |
| Pip        |                     |      | `pip --version`    |
| FastAPI    |                     |      |                    |
| PostgreSQL | 15 ou 16            |      |                    |

# Installation

## Installation de l'environnement virtuel
1. Installer la version 3.12 de Python

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

## Configuration de la base de données locale

6. Installer PostgreSQL (version 15 ou 16) si ce n'est pas déjà fait

7. Créer la base de données locale
```bash
createdb virtual_closet
```

8. Vérifier que la base a été créée
```bash
psql -l
```

## Configuration des variables d'environnement

9. Créer un fichier `.env` à la racine du dossier `server/` :
```env
ENV='dev'
DATABASE_LOCAL='postgresql://votre_username:votre_mot_de_passe@localhost:5432/virtual_closet'
DATABASE_URL_PROD='votre_url_postgresql_supabase'
```

> **Note** : Si votre utilisateur PostgreSQL local n'a pas de mot de passe, laissez le champ vide :
> `postgresql://votre_username:@localhost:5432/virtual_closet`

> **Note** : Le fichier `.env` n'est jamais poussé sur le dépôt distant (il est dans le `.gitignore`). En production, les variables d'environnement sont configurées directement dans le dashboard de la plateforme d'hébergement.

## Fonctionnement dev / prod

Le projet utilise la variable `ENV` pour déterminer l'environnement :

| Variable | Valeur | Comportement |
|----------|--------|--------------|
| `ENV`    | `dev`  | Connexion à PostgreSQL local, création automatique des tables au démarrage |
| `ENV`    | `prod` | Connexion à PostgreSQL Supabase, les tables existent déjà |

## Lancer l'application backend

10. Démarrer le serveur FastAPI
```bash
fastapi dev main.py
```

L'API sera accessible sur : http://localhost:8000
Documentation automatique : http://localhost:8000/docs

> **Note** : On utilise `python -m fastapi` au lieu de `fastapi` directement pour éviter les conflits avec pyenv.

## Gestion des tables (en dev)

Au premier lancement en mode `dev`, les tables sont créées automatiquement à partir des modèles SQLModel.

Si vous modifiez les modèles (ajout/suppression de colonnes), les tables existantes ne sont pas mises à jour automatiquement. En attendant la mise en place d'un outil de migration (Alembic), il faut :

1. Supprimer les tables existantes
```bash
psql -d virtual_closet -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```

2. Relancer l'application pour recréer les tables
```bash
fastapi dev main.py
```