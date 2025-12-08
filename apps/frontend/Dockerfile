FROM node:20-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN mkdir -p apps/frontend && mkdir -p packages/shared-types
COPY apps/frontend/package.json ./apps/frontend/package.json
COPY packages/shared-types/package.json ./packages/shared-types/package.json

RUN pnpm install --frozen-lockfile

COPY apps/frontend ./apps/frontend
COPY packages/shared-types ./packages/shared-types

WORKDIR /app/apps/frontend

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]