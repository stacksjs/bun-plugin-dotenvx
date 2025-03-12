# Advanced Configuration Example

This example demonstrates advanced configuration techniques with `bun-plugin-dotenvx`.

## Setup

First, install the plugin:

```bash
bun install -d bun-plugin-dotenvx
```

## Creating a Custom Plugin Configuration

Create a file to configure the plugin with advanced options:

```ts
// dotenv-config.ts
import { plugin } from 'bun'
import { createDotenvxPlugin } from 'bun-plugin-dotenvx'

// Determine the current environment
const NODE_ENV = process.env.NODE_ENV || 'development'
const IS_CI = process.env.CI === 'true'
const IS_DEBUG = process.env.DEBUG === 'true'

// Create a custom plugin configuration
const dotenvxPlugin = createDotenvxPlugin({
  // Environment-specific configuration
  path: IS_CI
    ? [`.env.${NODE_ENV}.ci`, `.env.${NODE_ENV}`, '.env']
    : [`.env.${NODE_ENV}.local`, `.env.${NODE_ENV}`, '.env.local', '.env'],

  // Override behavior
  overload: true,

  // Error handling
  strict: NODE_ENV === 'production', // Strict in production
  ignore: NODE_ENV !== 'production' ? ['MISSING_ENV_FILE'] : undefined,

  // Custom .env.keys file location
  envKeysFile: IS_CI ? '.env.keys.ci' : '.env.keys',

  // Logging configuration
  logLevel: IS_DEBUG ? 'debug' : (NODE_ENV === 'production' ? 'error' : 'info'),
  quiet: IS_CI && !IS_DEBUG, // Quiet in CI unless debug is enabled
})

// Register the plugin
await plugin(dotenvxPlugin)

console.log(`Environment: ${NODE_ENV}`)
console.log(`CI: ${IS_CI}`)
console.log(`Debug: ${IS_DEBUG}`)
```

## Configure Bun to Use Your Custom Configuration

Add your configuration file to `bunfig.toml`:

```toml
preload = [ "./dotenv-config.ts" ]
```

## Creating a Comprehensive .env Structure

Set up a comprehensive .env structure for different environments:

```
project/
├── .env                  # Base environment variables (committed to git)
├── .env.local            # Local overrides (not committed)
├── .env.development      # Development environment (committed)
├── .env.development.local # Local development overrides (not committed)
├── .env.test             # Test environment (committed)
├── .env.test.local       # Local test overrides (not committed)
├── .env.production       # Production environment (committed)
├── .env.keys             # Encryption keys (not committed)
├── .env.keys.ci          # CI encryption keys (not committed)
└── .gitignore            # Git ignore file
```

## Example .gitignore Configuration

```
# .gitignore
.env.local
.env.*.local
.env.keys
.env.keys.*
```

## Advanced .env File Examples

### Base .env File (.env)

```ini
# .env - Base configuration (committed to git)

# Application
APP_NAME=my-awesome-app
APP_VERSION=1.0.0

# Feature flags (defaults)
FEATURE_NEW_UI=false
FEATURE_ANALYTICS=false
FEATURE_BETA=false

# Timeouts and limits
REQUEST_TIMEOUT=30000
RATE_LIMIT=100
MAX_UPLOAD_SIZE=10485760

# Logging
LOG_FORMAT=json
LOG_LEVEL=info
```

### Environment-Specific .env File (.env.development)

```ini
# .env.development - Development configuration (committed to git)

# Environment
NODE_ENV=development

# Server
PORT=3000
HOST=localhost
BASE_URL=http://${HOST}:${PORT}

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=dev_user
DB_NAME=dev_db
DB_PASSWORD=dev_password # Encrypted in the committed file

# Feature flags
FEATURE_NEW_UI=true
FEATURE_BETA=true

# Logging
LOG_LEVEL=debug
```

### Local Overrides (.env.development.local)

```ini
# .env.development.local - Local development overrides (not committed)

# Override database for local development
DB_PASSWORD=my_local_password

# Local-specific settings
LOCAL_USER=$(whoami)
LOCAL_WORKSPACE=${HOME}/projects/${APP_NAME}

# Additional feature flags
FEATURE_EXPERIMENTAL=true
```

### Production Configuration (.env.production)

```ini
# .env.production - Production configuration (committed to git)

# Environment
NODE_ENV=production

# Server
PORT=8080
HOST=0.0.0.0
BASE_URL=https://api.example.com

# Database (all sensitive values encrypted)
DB_HOST=production-db.example.com
DB_PORT=5432
DB_USER=prod_user
DB_NAME=prod_db
DB_PASSWORD=super_secret_password # Encrypted in the committed file

# Feature flags
FEATURE_ANALYTICS=true

# Logging
LOG_LEVEL=warn
```

## Using Environment Variables in Your Application

```ts
// app.ts
import env from './.env'

// Application configuration
const config = {
  app: {
    name: env.APP_NAME,
    version: env.APP_VERSION,
    environment: env.NODE_ENV,
  },
  server: {
    port: Number.parseInt(env.PORT || '3000'),
    host: env.HOST || 'localhost',
    baseUrl: env.BASE_URL,
  },
  database: {
    host: env.DB_HOST,
    port: Number.parseInt(env.DB_PORT || '5432'),
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    name: env.DB_NAME,
    url: `postgres://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`,
  },
  features: {
    newUi: env.FEATURE_NEW_UI === 'true',
    analytics: env.FEATURE_ANALYTICS === 'true',
    beta: env.FEATURE_BETA === 'true',
    experimental: env.FEATURE_EXPERIMENTAL === 'true',
  },
  logging: {
    level: env.LOG_LEVEL || 'info',
    format: env.LOG_FORMAT || 'json',
  },
  limits: {
    requestTimeout: Number.parseInt(env.REQUEST_TIMEOUT || '30000'),
    rateLimit: Number.parseInt(env.RATE_LIMIT || '100'),
    maxUploadSize: Number.parseInt(env.MAX_UPLOAD_SIZE || '10485760'),
  },
}

console.log('Application Configuration:', config)

// Feature flag usage example
if (config.features.newUi) {
  console.log('Using new UI')
}

// Export the configuration
export default config
```

## Running in Different Environments

```bash
# Development (default)
bun run app.ts

# Production
NODE_ENV=production bun run app.ts

# Test
NODE_ENV=test bun run app.ts

# With debug logging
DEBUG=true bun run app.ts

# In CI environment
CI=true NODE_ENV=production bun run app.ts
```

## Best Practices for Advanced Configuration

1. **Use a layered approach**: Base configuration + environment-specific + local overrides
2. **Encrypt sensitive values**: Always encrypt passwords, API keys, and other secrets
3. **Use feature flags**: Control feature availability across environments
4. **Validate configuration**: Validate required variables and types at startup
5. **Document your configuration**: Add comments to explain the purpose of each variable
6. **Use consistent naming**: Follow a consistent naming convention for variables
7. **Group related variables**: Keep related configuration together
8. **Provide sensible defaults**: Set reasonable default values where appropriate
9. **Separate configuration from code**: Keep configuration in .env files, not hardcoded
10. **Version your configuration**: Track changes to your configuration files

This advanced configuration approach provides a robust foundation for managing environment variables across different environments and deployment scenarios.
