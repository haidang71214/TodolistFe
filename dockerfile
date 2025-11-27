# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all source files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary runtime files
COPY package.json package-lock.json* ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy build output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# ⚠️ KHÔNG copy lại package.json từ builder (vô nghĩa & gây ghi đè)
# ❌ COPY --from=builder /app/package.json ./
# Gỡ bỏ dòng này

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
