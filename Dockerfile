# Stage 1: Build
FROM node:22 AS build

# Enable corepack to use the pnpm version specified in package.json
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SKIP_SIMPLE_GIT_HOOKS=1
RUN corepack enable

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy source code
COPY . .

# Install dependencies
# We use --frozen-lockfile to ensure reproducible builds
RUN pnpm install --frozen-lockfile

# Prepare
RUN pnpm run dev:prepare

# Build the project
# This uses the root build script which builds workspace packages and then the docs
ARG NUXT_GITHUB_TOKEN
ENV NUXT_GITHUB_TOKEN=$NUXT_GITHUB_TOKEN
RUN pnpm run build && pnpm run build:docs

# Stage 2: Production
FROM node:22-slim AS production

WORKDIR /app

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Copy the built application from the build stage
COPY --from=build /app/docs/.output /app/docs/.output

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "docs/.output/server/index.mjs"]
