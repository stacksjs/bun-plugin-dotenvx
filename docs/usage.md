# Usage Guide

This guide covers the various ways to use `bun-plugin-dotenvx` in your Bun projects, from basic to advanced configurations.

## Configuration Options

You can customize the plugin behavior by creating a custom instance with specific options:

```ts
// plugin.ts
import { plugin } from 'bun'
import { createDotenvxPlugin } from 'bun-plugin-dotenvx'

// Create a custom plugin instance
const dotenvxPlugin = createDotenvxPlugin({
  // Configuration options
  path: ['.env.local', '.env'],
  overload: true,
  strict: false,
  verbose: true,
  // ...other options
})

// Register the plugin
await plugin(dotenvxPlugin)
```

### Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `path` | `string \| string[]` | `['.env']` | Path(s) to your env file(s) |
| `overload` | `boolean` | `false` | Override existing env variables |
| `strict` | `boolean` | `false` | Exit with code 1 if any errors are encountered |
| `ignore` | `string[]` | `undefined` | Ignore specific errors |
| `envKeysFile` | `string` | `'.env.keys'` | Path to your .env.keys file |
| `convention` | `'nextjs'` | `undefined` | Load a .env convention |
| `logLevel` | `string` | `'info'` | Set log level |
| `quiet` | `boolean` | `false` | Suppress all output (except errors) |
| `verbose` | `boolean` | `false` | Set log level to verbose |
| `debug` | `boolean` | `false` | Set log level to debug |

## Working with Multiple Environments

### Environment-Specific .env Files

You can create environment-specific .env files like `.env.production` or `.env.development`:

```bash
# Create environment-specific .env files
echo "API_KEY=production_key" > .env.production
echo "API_KEY=development_key" > .env.development
```

To use these files, specify them in your plugin configuration:

```ts
// For development
const devPlugin = createDotenvxPlugin({
  path: ['.env.development', '.env'],
})

// For production
const prodPlugin = createDotenvxPlugin({
  path: ['.env.production', '.env'],
})
```

### Using Multiple .env Files

You can load multiple .env files in order of priority:

```ts
const plugin = createDotenvxPlugin({
  path: ['.env.local', '.env.development', '.env'],
})
```

By default, variables from the first file take precedence. If you want later files to override earlier ones, set `overload: true`.

### Using Next.js Convention

If you're familiar with Next.js' .env file convention, you can use it with:

```ts
const plugin = createDotenvxPlugin({
  convention: 'nextjs',
})
```

This will load files in the following order:

1. `.env.development.local`
2. `.env.local`
3. `.env.development`
4. `.env`

## Working with Encrypted Environment Variables

### Encrypting Your .env Files

To encrypt your .env files, use the dotenvx CLI:

```bash
# Create a .env file
echo "API_KEY=your_secret_key" > .env

# Encrypt the .env file
npx @dotenvx/dotenvx encrypt
```

This will encrypt your .env file and create a `.env.keys` file with the encryption keys.

### Running with Encrypted .env Files

When running your application with encrypted .env files, you need to provide the decryption key:

```bash
# Run with the decryption key
DOTENV_PRIVATE_KEY="your-private-key" bun run your-script.ts
```

For environment-specific files, use the corresponding key:

```bash
# For .env.production
DOTENV_PRIVATE_KEY_PRODUCTION="your-production-key" bun run your-script.ts
```

### Combining Multiple Encrypted .env Files

You can use multiple encrypted .env files together:

```bash
# Combine .env and .env.production
DOTENV_PRIVATE_KEY="your-key" DOTENV_PRIVATE_KEY_PRODUCTION="your-prod-key" bun run your-script.ts
```

## Advanced Features

### Variable Expansion

You can reference and expand variables already on your machine in your .env file:

```ini
# .env
USERNAME="username"
DATABASE_URL="postgres://${USERNAME}@localhost/my_database"
```

### Command Substitution

You can include the output of a command in your .env variables:

```ini
# .env
CURRENT_USER="$(whoami)"
GIT_BRANCH="$(git branch --show-current)"
```

### Error Handling with Strict Mode

Enable strict mode to exit with code 1 if any errors are encountered:

```ts
const plugin = createDotenvxPlugin({
  strict: true,
})
```

### Ignoring Specific Errors

You can ignore specific errors, such as missing .env files:

```ts
const plugin = createDotenvxPlugin({
  ignore: ['MISSING_ENV_FILE'],
})
```

### Verbose Logging

Enable verbose logging for more detailed output:

```ts
const plugin = createDotenvxPlugin({
  verbose: true,
  // or
  logLevel: 'verbose',
})
```

## Security Best Practices

1. **Add `.env.keys` to your `.gitignore`** - Never commit your private keys to your repository
2. **Commit encrypted .env files** - It's safe to commit encrypted .env files to your repository
3. **Use environment-specific keys** - Use different keys for different environments
4. **Rotate keys periodically** - Use `dotenvx rotate` to rotate your encryption keys
5. **Use strict mode in production** - Enable strict mode to ensure all required variables are available

For more information on dotenvx, visit [dotenvx.com](https://dotenvx.com).
