# Usar a imagem oficial do Node.js como base
FROM node:20-slim

# Criar o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências

RUN npm install --only=production

# Copiar o restante do código da aplicação
COPY . .

# Copiar o arquivo de variáveis de ambiente
COPY .env .env

# Expor a porta em que a aplicação será executada
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
