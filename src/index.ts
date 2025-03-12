import { plugin } from 'bun'
import process from 'node:process'

// @ts-expect-error dotenvx is not typed atm
import('@dotenvx/dotenvx/config')

// eslint-disable-next-line antfu/no-top-level-await
await plugin({
  name: 'bun-plugin-dotenvx',

  async setup(build) {
    build.onLoad({ filter: /\.env.*$/ }, async () => {
      const exports = process.env

      return {
        exports: {
          default: exports,
          ...exports,
        },

        loader: 'object',
      }
    })
  },
})
