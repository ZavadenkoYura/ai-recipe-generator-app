# ------------------- BASE STAGE -------------------
FROM node:20-slim AS base

WORKDIR /usr/src/app
COPY package*.json ./

# ------------------- DEVELOPMENT STAGE -------------------
FROM base AS development

# Cache npm installs
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

EXPOSE 8080
ENTRYPOINT ["npm", "run", "dev"]

# ------------------- BUILD STAGE -------------------
FROM base AS build

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm ci

COPY . .

RUN npm run build

# ------------------- PRODUCTION STAGE -------------------
FROM node:20-slim AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

RUN echo "Welcome to production 😘"

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# No changing to non-root user because write permissions are removed 

EXPOSE 8080

ENTRYPOINT ["node", "./dist/main.js"]
