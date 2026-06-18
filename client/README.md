# 🖥️ The Virtual Closet — Frontend

Stack : **React 19** · **Vite** · **TailwindCSS** · **TanStack Router** · **TanStack Query** · **Supabase** · **shadcn/ui**

## Prérequis

| Composant | Version recommandée | Vérification       |
|-----------|---------------------|--------------------|
| Node.js   | 18+                 | `node --version`   |
| npm       |                     | `npm --version`    |

## Installation et lancement

```bash
cd client
npm install
npm run dev
```

Application disponible sur `http://localhost:5173`

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lancer le serveur de développement |
| `npm run build` | Construire pour la production |
| `npm run preview` | Prévisualiser le build de production |
| `npm run test` | Lancer les tests (Vitest) |
| `npm run lint` | Lancer ESLint |

## Structure

```
src/
├── components/   # Composants UI génériques (shadcn/ui)
├── features/     # Fonctionnalités métier
│   ├── auth/     # Authentification (Supabase)
│   ├── tags/     # Gestion des tags
│   └── wardrobe/ # Gestion des vêtements
├── layouts/      # Layouts partagés (Header...)
├── lib/          # Configuration (queryClient, supabase...)
├── routes/       # Pages et routing (TanStack Router)
│   ├── _authenticated/   # Routes protégées
│   ├── login.jsx
│   └── register.jsx
├── shared/       # Utilitaires et hooks partagés
└── tests/        # Tests
```

## Variables d'environnement

Créer un fichier `.env` à la racine de `client/` :

```env
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_clé_anon_supabase
VITE_API_URL=http://localhost:8000
```
