# Encrypted Environment Variables Example

This example demonstrates how to use `bun-plugin-dotenvx` with encrypted environment variables.

## Setup

First, install the plugin and dotenvx CLI:

```bash
# Install the plugin
bun install -d bun-plugin-dotenvx

# Install dotenvx CLI globally (optional)
npm install -g @dotenvx/dotenvx
```

## Create and Encrypt .env Files

Create a `.env` file with sensitive information:

```ini
# .env
API_KEY=your_super_secret_api_key
DATABASE_PASSWORD=very_secure_password
JWT_SECRET=your_jwt_signing_secret
```

Now encrypt the file using dotenvx:

```bash
# Encrypt your .env file
npx @dotenvx/dotenvx encrypt
```

This will encrypt your `.env` file and create a `.env.keys` file with the encryption keys. Your encrypted `.env` file will look something like this:

```ini
#/-------------------[DOTENV_PUBLIC_KEY]--------------------/
#/            public-key encryption for .env files          /
#/       [how it works](https://dotenvx.com/encryption)     /
#/----------------------------------------------------------/
DOTENV_PUBLIC_KEY="034af93e93708b994c10f236c96ef88e47291066946cce2e8d98c9e02c741ced45"
# .env
API_KEY="encrypted:BDqDBibm4wsYqMpCjTQ6BsDHmMadg9K3dAt+Z9HPMfLEIRVz50hmLXPXRuDBXaJi..."
DATABASE_PASSWORD="encrypted:KJHkjhKJHkjhKJHkjhKJHkjhKJHkjhKJHkjhKJHkjhKJHkjhKJHkjh..."
JWT_SECRET="encrypted:LKJlkjLKJlkjLKJlkjLKJlkjLKJlkjLKJlkjLKJlkjLKJlkjLKJlkjLKJlkj..."
```

## Configure Bun to Use the Plugin

Add the plugin to your `bunfig.toml`:

```toml
preload = [ "./node_modules/bun-plugin-dotenvx/src/index.ts" ]
```

## Use in Your Code

Now you can import your encrypted `.env` file directly in your code:

```ts
// index.ts
import env from './.env'

console.log(`API Key: ${env.API_KEY}`)
console.log(`Database Password: ${env.DATABASE_PASSWORD}`)
console.log(`JWT Secret: ${env.JWT_SECRET}`)
```

## Run Your Application with Decryption Key

To run your application with the decryption key:

```bash
# Run with the decryption key
DOTENV_PRIVATE_KEY="your-private-key" bun run index.ts
```

You can find your private key in the `.env.keys` file:

```ini
# .env.keys
DOTENV_PRIVATE_KEY=a4547dcd9d3429615a3649bb79e87edb62ee6a74b007075e9141ae44f5fb412c
```

## Environment-Specific Encrypted Files

You can also encrypt environment-specific `.env` files:

```bash
# Create environment-specific .env files
echo "API_KEY=production_key" > .env.production
echo "API_KEY=staging_key" > .env.staging

# Encrypt them
npx @dotenvx/dotenvx encrypt -f .env.production
npx @dotenvx/dotenvx encrypt -f .env.staging
```

To use these files, you need to provide the corresponding private key:

```bash
# For .env.production
DOTENV_PRIVATE_KEY_PRODUCTION="your-production-key" bun run index.ts

# For .env.staging
DOTENV_PRIVATE_KEY_STAGING="your-staging-key" bun run index.ts
```

## Combining Multiple Encrypted Files

You can use multiple encrypted `.env` files together:

```bash
# Combine .env and .env.production
DOTENV_PRIVATE_KEY="your-key" DOTENV_PRIVATE_KEY_PRODUCTION="your-prod-key" bun run index.ts
```

## Security Best Practices

1. **Add `.env.keys` to your `.gitignore** - Never commit your private keys to your repository
2. **Commit encrypted .env files** - It's safe to commit encrypted .env files to your repository
3. **Use environment-specific keys** - Use different keys for different environments
4. **Rotate keys periodically** - Use `dotenvx rotate` to rotate your encryption keys
5. **Store production keys securely** - Use a secure secrets manager for production keys

## CI/CD Integration

For CI/CD pipelines, set the private key as a secret in your CI/CD provider:

```yaml
# GitHub Actions example
name: Build and Test
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun test
        env:
          DOTENV_PRIVATE_KEY: ${{ secrets.DOTENV_PRIVATE_KEY }}
```

For more advanced usage, check out the [Variable Expansion Example](/examples/variable-expansion) and [Command Substitution Example](/examples/command-substitution).
