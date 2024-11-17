FROM node:21-alpine3.18

WORKDIR /app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .
RUN chmod +x /app/entrypoint.sh

CMD ["./entrypoint.sh"]
