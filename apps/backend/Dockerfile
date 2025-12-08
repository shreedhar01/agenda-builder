# Builder Stage 
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN mkdir -p apps/backend && mkdir -p packages/shared-types
COPY apps/backend/package.json ./apps/backend/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json

RUN pnpm install --frozen-lockfile

COPY apps/backend ./apps/backend
COPY packages/shared-types ./packages/shared-types

WORKDIR /app/apps/backend
RUN pnpm build

EXPOSE 8000
CMD [ "node","-r","dotenv/config","dist/index.js" ]