FROM node:22

# Enable corepack to use the pnpm version specified in package.json
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy source code
COPY packages ./packages
COPY docs ./docs

# Install dependencies
# We use --frozen-lockfile to ensure reproducible builds
RUN pnpm install --frozen-lockfile

# Build the project
# This uses the root build script which builds workspace packages and then the docs
RUN pnpm run build

# Expose the port
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# Start the application
CMD ["node", "docs/.output/server/index.mjs"]
