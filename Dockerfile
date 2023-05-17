FROM node:current-alpine AS builder
ENV NODE_ENV development

WORKDIR /app
COPY . .

# Install dependencies and transpile typescript
RUN npm ci && \
	npm run build



FROM node:current-alpine AS runner
ENV NODE_ENV production

# Copy source code
WORKDIR /app
# When using COPY with more than one source file, the destination must be a directory and end with a /
COPY package* ./
COPY --from=builder /app/dist ./dist

# Install dependencies
RUN npm ci --omit=dev

# Create volume to persist database even if you forget to map a volume
VOLUME /data

# Start!
CMD npm start
