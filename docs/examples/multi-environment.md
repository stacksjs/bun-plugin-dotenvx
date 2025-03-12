# Multi-Environment Example

This example demonstrates how to use `bun-plugin-dotenvx` with multiple environment configurations.

## Setup

First, install the plugin:

```bash
bun install -d bun-plugin-dotenvx
```

## Create Environment-Specific .env Files

Create different `.env` files for each environment:

```ini
# .env (default environment)
API_URL=https://api.example.com
LOG_LEVEL=info
NODE_ENV=development
```

```ini
# .env.development
API_URL=https://dev-api.example.com
LOG_LEVEL=debug
```

```ini
# .env.production
API_URL=https://prod-api.example.com
LOG_LEVEL=error
NODE_ENV=production
```

```ini
# .env.local (for local overrides, not committed to git)
API_KEY=your_local_api_key
```

## Create a Custom Plugin Configuration

Create a file to configure the plugin for different environments:

```ts
// env-config.ts
import { plugin } from 'bun'
import { createDotenvxPlugin } from 'bun-plugin-dotenvx'

// Determine the current environment
const env = process.env.NODE_ENV || 'development'

// Create environment-specific plugin configurations
if (env === 'production') {
  // Production environment
  await plugin(createDotenvxPlugin({
    path: ['.env.production.local', '.env.production', '.env.local', '.env'],
    strict: true, // Fail if any required env vars are missing
  }))
}
else if (env === 'test') {
  // Test environment
  await plugin(createDotenvxPlugin({
    path: ['.env.test.local', '.env.test', '.env.local', '.env'],
  }))
}
else {
  // Development environment (default)
  await plugin(createDotenvxPlugin({
    path: ['.env.development.local', '.env.development', '.env.local', '.env'],
    verbose: true, // More detailed logging
  }))
}

console.log(`Environment: ${env}`)
```

## Configure Bun to Use Your Custom Configuration

Add your configuration file to `bunfig.toml`:

```toml
preload = [ "./env-config.ts" ]
```

## Use in Your Code

Now you can import your `.env` files in your code:

```ts
// index.ts
import env from './.env'

console.log(`API URL: ${env.API_URL}`)
console.log(`Log Level: ${env.LOG_LEVEL}`)
console.log(`Node Environment: ${env.NODE_ENV}`)
console.log(`API Key: ${env.API_KEY || 'Not set'}`)
```

## Run Your Application in Different Environments

Run your application with different environment settings:

```bash
# Development (default)
bun run index.ts

# Production
NODE_ENV=production bun run index.ts

# Test
NODE_ENV=test bun run index.ts
```

## Using Next.js Convention

Alternatively, you can use the Next.js convention for loading environment variables:

```ts
// env-config-nextjs.ts
import { plugin } from 'bun'
import { createDotenvxPlugin } from 'bun-plugin-dotenvx'

await plugin(createDotenvxPlugin({
  convention: 'nextjs',
}))
```

This will automatically load the appropriate files based on the current environment, following Next.js' convention:

1. `.env.{environment}.local`
2. `.env.local`
3. `.env.{environment}`
4. `.env`

## Benefits of Multi-Environment Configuration

Using multiple environment configurations provides several benefits:

1. **Environment-Specific Settings**: Different settings for development, testing, and production
2. **Local Overrides**: Override settings for your local development without affecting others
3. **Secure Defaults**: Keep sensitive information out of your default configuration
4. **Consistent Behavior**: Ensure your application behaves consistently across environments

For more advanced usage, check out the [Encrypted Envs Example](/examples/encrypted-envs) and [Variable Expansion Example](/examples/variable-expansion).
