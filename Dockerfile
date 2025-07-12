# Builder stage
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Use nice and NODE_OPTIONS to limit resource use
RUN nice -n 19 env NODE_OPTIONS="--max-old-space-size=336" npm ci

COPY . .

# Build Next.js app
RUN nice -n 19 env NODE_OPTIONS="--max-old-space-size=4096" npm run build

# Production stage
FROM node:24-alpine AS production

# Optional: Add compatibility layer for native modules (some Prisma etc.)
RUN apk add --no-cache libc6-compat

WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy build output
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
CMD ["npm", "start"]
