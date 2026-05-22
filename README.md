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

The Virtual Closet est une application web fullstack permettant de gérer ses vêtements dans sa garde-robe digitale. L'utilisateur pourra visualiser son catalogue personnel de vêtements et le gérer. Le projet répond à un besoin concret : avoir une vue d'ensemble de sa garde-robe, en optimiser l'utilisation et la créativité, éviter les doublons d'achats, vérifier la disponibilité de ses pièces,  trier les pièces selon certains critères, composer des tenues rapidement et plus encore.

Projet réalisé en binôme dans le cadre du titre **RNCP 6 — Concepteur Développeur d'Applications** à Ada Tech School.

## ✨ Fonctionnalités

| Fonctionnalité | Statut |
|---|---|
| 👗 Gestion du catalogue : visualisation, ajout, modification, suppression des pièces et système de tags et de catégorisation avancé. | ✅ En cours d'implémentation |
| 🔐 Gestion d'un compte utilisateur : création d'un compte, connexion, gestion du profil ... | 🔜 À venir | 
| 📸 Prise de photos : capturer des photos de qualité des pièces. | 🔜 À venir |
| 🔍 Recherche et filtrage avancés : recherche efficace grâce à des filtres avancés et un système de recherche par mots-clés et tags. | 🔜 À venir |
| 📊 Gestion des états et des statuts : vue d'ensemble sur la disponibilité des pièces (propre / sale / prêté ...).| 🔜 À venir | 


## 🏗️ Architecture

```
the_virtual_closet/
├── client/               # React 19 · Vite · TailwindCSS · TanStack
│   └── src/
│       ├── components/   # Composants UI réutilisables
│       ├── features/     # Fonctionnalités (tags, wardrobe)
│       └── routes/       # Pages et routing
│
└── server/               # FastAPI · SQLModel · Alembic
    └── app/
        ├── routers/      # Endpoints REST
        ├── models/       # Schémas SQLModel / Pydantic
        ├── repository/   # Accès aux données
        └── db/           # Connexion base de données
```

## 🚀 Lancer le projet en local

### Prérequis

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+

### Backend

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

🔌 Endpoints API

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/clothes/` | Liste tous les vêtements |
| `POST` | `/clothes/new_clothe` | Ajouter un vêtement |
| `GET` | `/clothes/{id}` | Détail d'un vêtement |
| `PATCH` | `/clothes/{id}/update` | Modifier un vêtement |
| `DELETE` | `/clothes/{id}/delete` | Supprimer un vêtement |
| `GET` | `/tags/` | Liste tous les tags |
| `POST` | `/tags/new_tag` | Créer un tag |
| `PATCH` | `/tags/{id}/update` | Modifier un tag |
| `DELETE` | `/tags/{id}/delete` | Supprimer un tag |
| `POST` | `/tags_clothes/new_relation` | Associer un tag à un vêtement |
| `DELETE` | `/tags_clothes/{id}/delete` | Retirer un tag d'un vêtement |

API disponible sur `http://localhost:8000`<br>
Documentation interactive (Swagger UI): `http://localhost:8000/docs`

### Frontend

```bash
cd client
npm install
npm run dev
```

Application disponible sur `http://localhost:5173`

## 👩‍💻 Développé par

Gwenaëlle Bussac · [@IkuroMaira](https://github.com/IkuroMaira#gwena%C3%ABlle-bussac) & Majda Fougou · [@Majda-Fg](https://github.com/Majda-Fg)
