# Installation

Installing `bun-plugin-dotenvx` is straightforward. You can add it to your Bun project using your preferred package manager.

::: code-group

```bash [bun]
# Recommended for Bun projects
bun install --dev bun-plugin-dotenvx

# or, install via
# bun add -d bun-plugin-dotenvx
```

```bash [npm]
npm install --save-dev bun-plugin-dotenvx

# or, install via
# npm i -d bun-plugin-dotenvx
```

```bash [pnpm]
pnpm add --save-dev bun-plugin-dotenvx

# or, install via
# pnpm i -d bun-plugin-dotenvx
```

```bash [yarn]
yarn add --dev bun-plugin-dotenvx

# or, install via
# yarn add -D bun-plugin-dotenvx
```

:::

## Plugin Setup

After installation, you need to configure Bun to use the plugin. There are two ways to do this:

### Option 1: Using bunfig.toml (Recommended)

Add the plugin to your `bunfig.toml` file to preload it automatically:

```toml
preload = [
  "./node_modules/bun-plugin-dotenvx/src/index.ts",
  # ...other preloads
]
```

### Option 2: Manual Plugin Registration

Alternatively, you can manually register the plugin in your code:

```ts
// plugin.ts
import { plugin } from 'bun'
import { createDotenvxPlugin } from 'bun-plugin-dotenvx'

// Create a custom plugin instance
const dotenvxPlugin = createDotenvxPlugin({
  // Optional configuration
  path: ['.env.local', '.env'],
  overload: true,
})

// Register the plugin
await plugin(dotenvxPlugin)
```

Then, add this file to your `bunfig.toml`:

```toml
preload = [
  "./plugin.ts",
  # ...other preloads
]
```

## Basic Usage

Once the plugin is set up, you can import your `.env` files directly as modules:

```ts
// Import your .env file
import env from './.env'

// Access environment variables
const apiKey = env.API_KEY
const databaseUrl = env.DATABASE_URL

console.log(`API Key: ${apiKey}`)
console.log(`Database URL: ${databaseUrl}`)
```

## Using Encrypted Environment Variables

To use encrypted environment variables:

1. First, install dotenvx CLI (if you haven't already):

```bash
# Install dotenvx globally
npm install -g @dotenvx/dotenvx

# Or use it directly with npx
npx @dotenvx/dotenvx
```

2. Encrypt your `.env` file:

```bash
# Encrypt your .env file
npx @dotenvx/dotenvx encrypt
```

3. Run your application with the decryption key:

```bash
# Run with the decryption key
DOTENV_PRIVATE_KEY="your-private-key" bun run your-script.ts
```

For more advanced usage options, check out the [Usage Guide](/usage) in our documentation.
