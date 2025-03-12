# Basic Usage Example

This example demonstrates the simplest way to use `bun-plugin-dotenvx` in your Bun project.

## Setup

First, install the plugin:

```bash
bun install -d bun-plugin-dotenvx
```

Then, add it to your `bunfig.toml`:

```toml
preload = [ "./node_modules/bun-plugin-dotenvx/src/index.ts" ]
```

## Create a .env File

Create a `.env` file in your project root:

```ini
# .env
API_KEY=your_secret_api_key
DATABASE_URL=postgres://user:password@localhost:5432/mydb
NODE_ENV=development
```

## Use in Your Code

Now you can import your `.env` file directly in your code:

```ts
// index.ts
import env from './.env'

console.log(`API Key: ${env.API_KEY}`)
console.log(`Database URL: ${env.DATABASE_URL}`)
console.log(`Node Environment: ${env.NODE_ENV}`)
```

## Run Your Application

Run your application with Bun:

```bash
bun run index.ts
```

You should see your environment variables printed to the console:

```
API Key: your_secret_api_key
Database URL: postgres://user:password@localhost:5432/mydb
Node Environment: development
```

## How It Works

The plugin automatically loads your `.env` file and makes its contents available as a module that you can import. This approach provides several benefits:

1. **Type Safety**: Your IDE can provide autocomplete for your environment variables
2. **Direct Imports**: No need to use `process.env` or other global objects
3. **Simplicity**: No additional configuration required

For more advanced usage, check out the [Multi-Environment Example](/examples/multi-environment) and [Encrypted Envs Example](/examples/encrypted-envs).
