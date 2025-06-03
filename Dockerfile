# syntax=docker/dockerfile:1

FROM node:18-alpine AS base

ARG ENV=local

FROM base AS deps
# Установка зависимостей, которые могут понадобиться (например, для некоторых пакетов node)
RUN apk add --no-cache libc6-compat

WORKDIR /app

# --- Установка зависимостей ---
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# --- Сборка приложения ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env.${ENV} .env.production.local

RUN npm run build

# --- Финальный образ ---
FROM base AS runner

WORKDIR /app
ENV NODE_ENV=production

# Создаём отдельного пользователя
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Копируем необходимые файлы
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env.production ./

# Создаем директорию для кэша и настраиваем права доступа
RUN mkdir -p ./.next/cache && chown -R nextjs:nodejs ./.next

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
