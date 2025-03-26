FROM node:22.13.1-alpine AS builder
WORKDIR /app

# Install Sharp dependencies for Alpine
RUN apk add --no-cache build-base python3 vips-dev

COPY package*.json ./
# Install dependencies with Sharp specifically for Alpine
RUN npm ci
RUN npm install --platform=linuxmusl --arch=x64 sharp

COPY . .
RUN npm run build

FROM node:22.13.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Install runtime dependencies for Sharp
RUN apk add --no-cache vips-dev

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
# Copy Sharp module specifically
COPY --from=builder /app/node_modules/sharp ./node_modules/sharp

EXPOSE 3000
CMD ["node", "server.js"]