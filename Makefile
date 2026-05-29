.PHONY: help dev front back install install-front install-back

help:
	@echo "Commandes disponibles :"
	@echo "  make dev            — Lance le front et le back en parallèle"
	@echo "  make front          — Lance uniquement le client (Vite)"
	@echo "  make back           — Lance uniquement le serveur (FastAPI)"
	@echo "  make install        — Installe les dépendances front et back"
	@echo "  make install-front  — Installe les dépendances npm"
	@echo "  make install-back   — Installe les dépendances Python"

dev:
	make -j2 front back

front:
	cd client && npm run dev

back:
	cd server && uvicorn main:app --reload

install: install-front install-back

install-front:
	cd client && npm install

install-back:
	cd server && pip install -r requirements.txt
