import type { BunPlugin } from 'bun'
import process from 'node:process'
import * as dotenvx from '@dotenvx/dotenvx'

export interface DotenvxPluginOptions {
  /**
   * Path(s) to your env file(s)
   * @default ['.env']
   */
  path?: string | string[]

  /**
   * Override existing env variables
   * @default false
   */
  overload?: boolean

  /**
   * Exit with code 1 if any errors are encountered
   * @default false
   */
  strict?: boolean

  /**
   * Ignore specific errors
   * @example ['MISSING_ENV_FILE']
   */
  ignore?: string[]

  /**
   * Path to your .env.keys file
   * @default '.env.keys'
   */
  envKeysFile?: string

  /**
   * Load a .env convention
   * @example 'nextjs'
   */
  convention?: 'nextjs'

  /**
   * Set log level
   * @default 'info'
   */
  logLevel?: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'errorv' | 'errornocolor' | 'success' | 'successv' | 'help' | 'http' | 'blank'

  /**
   * Suppress all output (except errors)
   * @default false
   */
  quiet?: boolean

  /**
   * Set log level to verbose
   * @default false
   */
  verbose?: boolean

  /**
   * Set log level to debug
   * @default false
   */
  debug?: boolean
}

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
