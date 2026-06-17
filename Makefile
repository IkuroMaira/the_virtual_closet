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

dev:
	make -j2 front back

stop:
	@pkill -f "uvicorn main:app" || true
	@pkill -f "vite" || true
	@echo "Serveurs arrêtés."

front:
	cd client && npm run dev

back:
	cd server && uvicorn main:app --reload

install: install-front install-back

install-front:
	cd client && npm install

install-back:
	cd server && pip install -r requirements.txt

install-back-dev:
	cd server && pip install -r requirements.txt -r requirements-dev.txt
