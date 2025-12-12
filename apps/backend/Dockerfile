FROM node:20-alpine

WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN mkdir -p packages/database packages/eslint-config packages/shared-types packages/typescript-config apps/backend

COPY packages/database/package.json ./packages/database/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY packages/database ./packages/database
COPY packages/eslint-config ./packages/eslint-config
COPY packages/shared-types ./packages/shared-types
COPY packages/typescript-config ./packages/typescript-config
COPY apps/backend ./apps/backend

WORKDIR /app
RUN pnpm -r build

WORKDIR /app/apps/backend

EXPOSE 8000
CMD ["node", "-r", "dotenv/config", "dist/index.js"]