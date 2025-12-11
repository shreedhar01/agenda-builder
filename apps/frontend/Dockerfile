FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN mkdir -p packages/ui
COPY packages/ui/package.json ./packages/ui/package.json

RUN mkdir -p packages/eslint-config
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json

RUN mkdir -p packages/shared-types
COPY packages/shared-types/package.json ./packages/shared-types/package.json

RUN mkdir -p apps/frontend && mkdir -p packages/typescript-config
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json


RUN pnpm install --frozen-lockfile --ignore-scripts

COPY apps/frontend ./apps/frontend
COPY packages/ui ./packages/ui
COPY packages/eslint-config ./packages/eslint-config
COPY packages/shared-types ./packages/shared-types
COPY packages/typescript-config ./packages/typescript-config

WORKDIR /app/apps/frontend

RUN pnpm -r build

EXPOSE 3000

CMD ["pnpm", "start"]