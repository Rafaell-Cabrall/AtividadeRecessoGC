# Use a imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie os arquivos package.json e package-lock.json para o container
COPY app/package*.json ./

# Configurar npm para evitar problemas de SSL
RUN npm config set strict-ssl false

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código para o container
COPY app .

# Exponha a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "server.js"]
