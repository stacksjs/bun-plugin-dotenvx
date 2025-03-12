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