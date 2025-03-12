import type { BunPlugin } from 'bun'
import type { DotenvxPluginOptions } from './types'
import process from 'node:process'
import * as dotenvx from '@dotenvx/dotenvx'

/**
 * Create a dotenvx plugin with custom options
 */
export function createDotenvxPlugin(options: DotenvxPluginOptions = {}): BunPlugin {
  return {
    name: 'bun-plugin-dotenvx',

    async setup(build) {
      // Load environment variables with the provided options
      dotenvx.config({
        path: options.path || ['.env'],
        overload: options.overload,
        strict: options.strict,
        ignore: options.ignore,
        envKeysFile: options.envKeysFile,
        // Handle log levels
        ...(options.quiet && { logLevel: 'error' }),
        ...(options.verbose && { logLevel: 'verbose' }),
        ...(options.debug && { logLevel: 'debug' }),
        ...(options.logLevel && { logLevel: options.logLevel }),
      })

      build.onLoad({ filter: /\.env.*$/ }, async (args) => {
        // Get the file path from the args
        const filePath = args.path

        // Load the specific .env file if it's being imported directly
        if (filePath) {
          // Create options specific to this file
          const fileOptions = {
            ...options,
            path: [filePath],
          }

          // Load the specific .env file
          dotenvx.config(fileOptions)
        }

        // Return the environment variables
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
  }
}

export * from './types'

export default createDotenvxPlugin
