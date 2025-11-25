FROM node:22

# Enable corepack to use the pnpm version specified in package.json
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV SKIP_SIMPLE_GIT_HOOKS=1
RUN corepack enable

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy source code
# COPY packages ./packages
# COPY docs ./docs
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
RUN pnpm run build:docs

# Expose the port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Start the application
CMD ["node", "docs/.output/server/index.mjs"]
