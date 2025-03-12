![Social Card of this repo](https://github.com/stacksjs/bun-plugin-dotenvx/blob/main/.github/art/cover.jpg?raw=true)

# Introduction

`bun-plugin-dotenvx` is a powerful Bun plugin that seamlessly integrates with dotenvx to provide enhanced environment variable management for your Bun applications.

## What is bun-plugin-dotenvx?

This plugin extends Bun's capabilities by allowing you to:

- **Import .env files directly** as modules in your code
- **Decrypt encrypted environment variables** at runtime
- **Support multiple environments** with different .env files
- **Expand variables and substitute commands** in your .env values
- **Configure the behavior** to match your specific needs

## Why Use bun-plugin-dotenvx?

Environment variables are crucial for application configuration, but managing them securely can be challenging. This plugin solves several common problems:

- **Security**: Store encrypted environment variables safely in your codebase
- **Flexibility**: Support different configurations for development, testing, and production
- **Convenience**: Import .env files directly as modules
- **Compatibility**: Works with any Bun application

## What is dotenvx?

[dotenvx](https://dotenvx.com) is a better dotenv from the creator of the original `dotenv` package. It provides:

- Cross-platform compatibility (run anywhere)
- Multi-environment support
- Encrypted environment variables

This plugin leverages dotenvx to bring these powerful features to your Bun applications.

## How It Works

1. **Install the plugin**: Add bun-plugin-dotenvx to your project
2. **Configure in bunfig.toml**: Add the plugin to your Bun configuration
3. **Import .env files**: Import your .env files directly in your code
4. **Access environment variables**: Use the imported variables in your application

The plugin handles all the complexity of loading, decrypting, and managing your environment variables, making it easy to use them in your Bun projects.

## Key Features

### Direct .env Imports

Import your .env files directly as modules:

```ts
import env from './.env'

console.log(`API Key: ${env.API_KEY}`)
```

### Multi-Environment Support

Load different .env files for different environments:

```ts
// Create a custom plugin instance for development
const devPlugin = createDotenvxPlugin({
  path: ['.env.development.local', '.env.development', '.env.local', '.env'],
})
```

### Encrypted Environment Variables

Store encrypted environment variables safely in your codebase:

```bash
# Encrypt your .env file
npx @dotenvx/dotenvx encrypt

# Run your application with the decryption key
DOTENV_PRIVATE_KEY="your-private-key" bun run your-script.ts
```

### Variable Expansion

Reference existing variables in your .env files:

```ini
# .env
USERNAME="username"
DATABASE_URL="postgres://${USERNAME}@localhost/my_database"
```

### Command Substitution

Include command outputs in your .env values:

```ini
# .env
CURRENT_USER="$(whoami)"
```

## Getting Started

Ready to get started? Check out the [Installation Guide](/install) to add bun-plugin-dotenvx to your project.

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Credits

- [Mot](https://github.com/motdotla) for creating [dotenv](https://github.com/motdotla/dotenv) & [dotenvx](https://github.com/dotenvx/dotenvx)
- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](https://github.com/stacksjs/bun-plugin-dotenvx/contributors)

## License

The MIT License (MIT). Please see [LICENSE](/license) for more information.

Made with 💙
