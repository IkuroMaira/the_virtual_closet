# 🧥 The Virtual Closet

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![SQLModel](https://img.shields.io/badge/SQLModel-3C3489?style=flat&logoColor=white)
![Alembic](https://img.shields.io/badge/Alembic-444441?style=flat&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Status](https://img.shields.io/badge/🚧_En_cours_de_développement-orange?style=flat)


## 📖 Présentation

The Virtual Closet est une application web fullstack permettant de gérer ses vêtements dans sa garde-robe digitale. L'utilisateur peut visualiser son catalogue personnel de vêtements et le gérer. Le projet répond à un besoin concret : avoir une vue d'ensemble de sa garde-robe, en optimiser l'utilisation et la créativité, éviter les doublons d'achats, vérifier la disponibilité de ses pièces, trier les pièces selon certains critères, composer des tenues rapidement et plus encore.

Projet réalisé en binôme dans le cadre du titre **RNCP 6 — Concepteur Développeur d'Applications** à Ada Tech School.

## ✨ Fonctionnalités

| Fonctionnalité | Statut |
|---|---|
| 👗 Gestion du catalogue : visualisation, ajout, modification, suppression des pièces et système de tags et de catégorisation avancé. | ✅ Implémenté |
| 🔐 Authentification : création de compte, connexion, routes protégées via Supabase. | ✅ Implémenté |
| 📸 Traitement d'image : suppression d'arrière-plan via IA (rembg). | ✅ Implémenté |
| 🔍 Recherche et filtrage avancés : filtres par catégorie, statut, couleur et tags. | 🔜 À venir |
| 📊 Gestion des états et des statuts : vue d'ensemble sur la disponibilité des pièces (propre / sale / prêté ...). | 🔜 À venir |


## 🏗️ Architecture

```
the_virtual_closet/
├── client/               # React 19 · Vite · TailwindCSS · TanStack · Supabase
│   └── src/
│       ├── components/   # Composants UI réutilisables (shadcn/ui)
│       ├── features/     # Fonctionnalités (auth, tags, wardrobe)
│       ├── layouts/      # Layouts partagés
│       ├── routes/       # Pages et routing (TanStack Router)
│       └── shared/       # Utilitaires, hooks, lib partagés
│
└── server/               # FastAPI · SQLModel · Alembic · rembg
    └── app/
        ├── routers/      # Endpoints REST
        ├── models/       # Schémas SQLModel / Pydantic
        ├── repository/   # Accès aux données
        ├── dependencies/ # Dépendances FastAPI (auth, db)
        ├── enums/        # Enums partagés
        └── db/           # Connexion base de données
```

## 🚀 Lancer le projet en local

### Prérequis

- Python 3.12+
- Node.js 18+
- PostgreSQL 15 ou 16

### Installation rapide (recommandé)

```bash
make install   # installe les dépendances front et back
make dev       # lance le front et le back en parallèle
```

Voir `make help` pour toutes les commandes disponibles.

### Backend (détail)

```bash
cd server
python -m venv .venv
source .venv/bin/activate      # macOS/Linux
source .venv/Scripts/activate  # Windows
pip install -r requirements.txt -r requirements-dev.txt
```

Créer un fichier `.env` dans `server/` :

```env
ENV='dev'
DATABASE_LOCAL='postgresql://postgres:postgres@localhost:5432/virtual_closet'
```

> 💡 En mode `dev`, seule la base de données locale PostgreSQL est utilisée. La base de production (Supabase) est privée et non accessible publiquement.

```bash
createdb virtual_closet
alembic upgrade head
fastapi dev main.py
```

### Frontend (détail)

```bash
cd client
npm install
npm run dev
```

Application disponible sur `http://localhost:5173`

## 🔌 Endpoints API

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/clothes/` | Liste tous les vêtements |
| `POST` | `/clothes/new_clothing` | Ajouter un vêtement |
| `GET` | `/clothes/item/{id}` | Détail d'un vêtement |
| `PATCH` | `/clothes/item/{id}/update` | Modifier un vêtement |
| `DELETE` | `/clothes/item/{id}/delete` | Supprimer un vêtement |
| `POST` | `/clothes/process-picture` | Supprimer le fond d'une image (IA) |
| `GET` | `/clothes/enums` | Lister les valeurs d'énumérations |
| `GET` | `/tags/` | Liste tous les tags |
| `POST` | `/tags/new_tag` | Créer un tag |
| `GET` | `/tags/tag/{id}` | Détail d'un tag |
| `GET` | `/tags/tag/{id}/clothes` | Vêtements associés à un tag |
| `PATCH` | `/tags/tag/{id}/update` | Modifier un tag |
| `DELETE` | `/tags/tag/{id}/delete` | Supprimer un tag |
| `GET` | `/clothes/{id}/tags` | Tags d'un vêtement |
| `POST` | `/clothes/{id}/tags/{tag_id}` | Associer un tag à un vêtement |
| `DELETE` | `/clothes/{id}/tags/{tag_id}` | Retirer un tag d'un vêtement |

API disponible sur `http://localhost:8000`<br>
Documentation interactive (Swagger UI) : `http://localhost:8000/docs`

## 👩‍💻 Développé par

Gwenaëlle Bussac · [@IkuroMaira](https://github.com/IkuroMaira#gwena%C3%ABlle-bussac) & Majda Fougou · [@Majda-Fg](https://github.com/Majda-Fg)
