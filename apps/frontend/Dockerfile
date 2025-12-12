FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN mkdir -p packages/ui packages/eslint-config packages/shared-types packages/typescript-config apps/frontend

COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/eslint-config/package.json ./packages/eslint-config/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY apps/frontend ./apps/frontend
COPY packages/ui ./packages/ui
COPY packages/eslint-config ./packages/eslint-config
COPY packages/shared-types ./packages/shared-types
COPY packages/typescript-config ./packages/typescript-config

WORKDIR /app
RUN pnpm -r build

WORKDIR /app/apps/frontend

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["pnpm", "exec", "next", "start"]