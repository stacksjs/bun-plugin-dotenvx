<p align="center"><img src=".github/art/cover.jpg" alt="Social Card of this repo"></p>

[![npm version][npm-version-src]][npm-version-href]
[![GitHub Actions][github-actions-src]][github-actions-href]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![npm downloads][npm-downloads-src]][npm-downloads-href]

# bun-plugin-dotenvx

A simple loader for your dotenv files.

## Features

- Simple `.env` file loader
- Powered by `dotenvx`
- Supports a wide variety of .env types
  - `.env`, `.env.local`, `.env.staging`, `.env.development`, `.env.dev`, `.env.beta` etc.

## Usage

```bash
bun install -d bun-plugin-dotenvx
```

Next, ensure you are preloading the plugin in your `bunfig.toml`:

```toml
preload = [
  "./node_modules/bun-plugin-dotenvx/src/index.ts",
  # ...
]
```

You may now use the decrypted `.env` values in your project:

```ts
import env from './.env'

// Accessing environment variables
const apiKey = env.API_KEY
const databaseUrl = env.DATABASE_URL

console.log(`API Key: ${apiKey}`)
console.log(`Database URL: ${databaseUrl}`)
```

## Testing

```bash
bun test
```

## Changelog

Please see our [releases](https://github.com/stacksjs/bun-plugin-dotenvx/releases) page for more information on what has changed recently.

## Contributing

Please review the [Contributing Guide](https://github.com/stacksjs/contributing) for details.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discussions on GitHub](https://github.com/stacksjs/stacks/discussions)

For casual chit-chat with others using this package:

[Join the Stacks Discord Server](https://discord.gg/stacksjs)

## Postcardware

“Software that is free, but hopes for a postcard.” We love receiving postcards from around the world showing where `bun-plugin-dotenvx` is being used! We showcase them on our website too.

Our address: Stacks.js, 12665 Village Ln #2306, Playa Vista, CA 90094 🌎

## Sponsors

We would like to extend our thanks to the following sponsors for funding Stacks development. If you are interested in becoming a sponsor, please reach out to us.

- [JetBrains](https://www.jetbrains.com/)
- [The Solana Foundation](https://solana.com/)

## Credits

Many thanks to the following core technologies & people who have contributed to this package:

- [Mot](https://github.com/motdotla) & [dotenv](https://github.com/motdotla/dotenv) & [dotenvx](https://github.com/dotenvx/dotenvx)
- [Chris Breuer](https://github.com/chrisbbreuer)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [LICENSE](https://github.com/stacksjs/stacks/tree/main/LICENSE.md) for more information.

Made with 💙

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/bun-plugin-dotenvx?style=flat-square
[npm-version-href]: https://npmjs.com/package/bun-plugin-dotenvx

[npm-downloads-src]: https://img.shields.io/npm/dm/bun-plugin-dotenvx?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/bun-plugin-dotenvx

[github-actions-src]: https://img.shields.io/github/actions/workflow/status/stacksjs/bun-plugin-dotenvx/ci.yml?style=flat-square&branch=main
[github-actions-href]: https://github.com/stacksjs/bun-plugin-dotenvx/actions?query=workflow%3Aci
