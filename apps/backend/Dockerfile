# Builder Stage 
FROM node:20-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

# Copy workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy all package.json files
RUN mkdir -p packages/database packages/eslint-config packages/shared-types packages/typescript-config apps/backend

COPY packages/database/package.json ./packages/database/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code
COPY packages/database ./packages/database
COPY packages/eslint-config ./packages/eslint-config
COPY packages/shared-types ./packages/shared-types
COPY packages/typescript-config ./packages/typescript-config
COPY apps/backend ./apps/backend

# Build shared-types first (backend depends on it)
WORKDIR /app/packages/shared-types
RUN pnpm build

# Build backend
WORKDIR /app/apps/backend
RUN pnpm build

# Runtime Stage
FROM node:20-alpine AS runner

WORKDIR /app
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/database/package.json ./packages/database/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/shared-types/package.json ./packages/shared-types/
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY apps/backend/package.json ./apps/backend/

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy built files from builder
COPY --from=builder /app/packages/shared-types/dist ./packages/shared-types/dist
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Copy necessary source files that aren't built
COPY packages/database ./packages/database
COPY packages/eslint-config ./packages/eslint-config
COPY packages/typescript-config ./packages/typescript-config

WORKDIR /app/apps/backend

EXPOSE 8000
CMD ["node", "-r", "dotenv/config", "dist/index.js"]