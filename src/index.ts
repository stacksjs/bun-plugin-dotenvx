import { plugin } from 'bun'
import * as dotenvx from '@dotenvx/dotenvx'
import { createDotenvxPlugin } from './plugin'

// Load dotenvx config with default options
dotenvx.config()

// Default plugin instance with default options
// eslint-disable-next-line antfu/no-top-level-await
await plugin(createDotenvxPlugin())
