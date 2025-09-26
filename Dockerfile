# Utilise l'image officielle Node.js
FROM node:alpine3.22

# Définit le répertoire de travail dans le container
WORKDIR /app

# Copie package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Expose le port sur lequel ton app écoute (probablement 3000)
EXPOSE 3000

# Commande pour démarrer l'application
#CMD ["node", "app.js"]