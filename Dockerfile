FROM node:20-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .

RUN npm run build

# Backend
FROM node:20-alpine

WORKDIR /backend

COPY backend/package*.json ./

RUN npm install

COPY backend/ .

COPY --from=frontend-build /frontend/build ./public

EXPOSE 5000

CMD ["node", "server.js"]