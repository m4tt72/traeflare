FROM oven/bun:1 as deps
WORKDIR /app
COPY bun.lockb package.json ./
RUN bun install --frozen-lockfile --production

FROM oven/bun:1 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/bun.lockb ./bun.lockb
COPY ./src ./src
COPY tsconfig.json .
RUN bun run build

FROM oven/bun:1 as runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
CMD ["bun", "dist/index.js"]