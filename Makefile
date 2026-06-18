.PHONY: help dev front back stop install install-front install-back install-back-dev

help:
	@echo "Commandes disponibles :"
	@echo "  make dev            — Lance le front et le back en parallèle"
	@echo "  make front          — Lance uniquement le client (Vite)"
	@echo "  make back           — Lance uniquement le serveur (FastAPI)"
	@echo "  make stop           — Arrête le front et le back"
	@echo "  make install        — Installe les dépendances front et back"
	@echo "  make install-front  — Installe les dépendances npm"
	@echo "  make install-back   — Installe les dépendances Python"
	@echo "  make install-back-dev — Installe les dépendances Python + dev (tests, lint)"

## Lance le front (Vite) et le back (FastAPI) en parallèle
dev:
	make -j2 front back

## Arrête les processus uvicorn et vite en cours
stop:
	@pkill -f "uvicorn main:app" || true
	@pkill -f "vite" || true
	@echo "Serveurs arrêtés."

## Lance uniquement le client React sur http://localhost:5173
front:
	cd client && npm run dev

## Lance uniquement l'API FastAPI sur http://localhost:8000 avec rechargement automatique
back:
	cd server && uvicorn main:app --reload

## Installe toutes les dépendances front et back
install: install-front install-back

## Installe les dépendances npm du client
install-front:
	cd client && npm install

## Installe les dépendances Python de production
install-back:
	cd server && pip install -r requirements.txt

## Installe les dépendances Python de production + dev (tests, lint)
install-back-dev:
	cd server && pip install -r requirements.txt -r requirements-dev.txt
