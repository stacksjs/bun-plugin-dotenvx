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
  logLevel?: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'success' | 'successv' | 'help'

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

// Global state to track if we should suppress dotenvx output
let shouldSuppressDotenvx = false
let originalConsoleLog: typeof console.log
let originalConsoleInfo: typeof console.info
let originalConsoleWarn: typeof console.warn

/**
 * Check if we're running under launchpad context
 */
function isLaunchpadContext(): boolean {
  return !!(
    // Primary indicator: shell integration flag
    process.env.LAUNCHPAD_SHELL_INTEGRATION
    // Secondary indicators
    || process.env.LAUNCHPAD_ORIGINAL_PATH
    || process.argv.some(arg => arg.includes('launchpad'))
    || process.argv0?.includes('launchpad')
    || process.title?.includes('launchpad')
    || process.cwd().includes('/launchpad')
    || process.argv[1]?.includes('launchpad')
  )
}

/**
 * Suppress all console output from dotenvx
 */
function suppressConsoleOutput(): void {
  if (shouldSuppressDotenvx)
    return // Already suppressed

  shouldSuppressDotenvx = true
  /* eslint-disable no-console */
  originalConsoleLog = console.log
  originalConsoleInfo = console.info
  originalConsoleWarn = console.warn

  // Suppress all dotenvx output
  console.log = (...args: any[]) => {
    const message = args.join(' ')
    if (!message.includes('[dotenvx@')) {
      originalConsoleLog(...args)
    }
  }

  console.info = (...args: any[]) => {
    const message = args.join(' ')
    if (!message.includes('[dotenvx@')) {
      originalConsoleInfo(...args)
    }
  }

  console.warn = (...args: any[]) => {
    const message = args.join(' ')
    if (!message.includes('[dotenvx@')) {
      originalConsoleWarn(...args)
    }
  }
  /* eslint-enable no-console */
}

/**
 * Restore original console methods
 */
function restoreConsoleOutput(): void {
  if (!shouldSuppressDotenvx)
    return // Not suppressed

  shouldSuppressDotenvx = false
  /* eslint-disable no-console */
  console.log = originalConsoleLog
  console.info = originalConsoleInfo
  console.warn = originalConsoleWarn
  /* eslint-enable no-console */
}

/**
 * Load dotenvx configuration with proper suppression
 */
function loadDotenvxConfig(options: DotenvxPluginOptions): void {
  const isLaunchpad = isLaunchpadContext()

  if (isLaunchpad) {
    suppressConsoleOutput()
  }

  try {
    const configOptions: any = {
      path: options.path || ['.env'],
      overload: options.overload,
      strict: options.strict,
      ignore: options.ignore,
      envKeysFile: options.envKeysFile,
    }

    // Handle log levels based on context
    if (isLaunchpad) {
      // Force error-only logging for launchpad
      configOptions.logLevel = 'error'
    }
    else {
      // Normal operation for non-launchpad usage
      if (options.quiet) {
        configOptions.logLevel = 'error'
      }
      else if (options.verbose) {
        configOptions.logLevel = 'verbose'
      }
      else if (options.debug) {
        configOptions.logLevel = 'debug'
      }
      else if (options.logLevel) {
        configOptions.logLevel = options.logLevel
      }
    }

    dotenvx.config(configOptions)
  }
  finally {
    if (isLaunchpad) {
      restoreConsoleOutput()
    }
  }
}

// Initialize dotenvx immediately when the module is loaded
// This ensures it runs even when imported via preloader
loadDotenvxConfig({})

/**
 * Create a dotenvx plugin with custom options
 */
export function createDotenvxPlugin(options: DotenvxPluginOptions = {}): BunPlugin {
  return {
    name: 'bun-plugin-dotenvx',

    async setup(build) {
      // Load dotenvx with the provided options
      loadDotenvxConfig(options)

      build.onLoad({ filter: /\.env.*$/ }, async (args) => {
        // Get the file path from the args
        const filePath = args.path

        // Load the specific .env file if it's being imported directly
        if (filePath) {
          loadDotenvxConfig({
            ...options,
            path: [filePath],
          })
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
