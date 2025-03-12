import { plugin } from 'bun'
import { afterEach, beforeEach, describe, expect, it } from 'bun:test'
import { existsSync, unlinkSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { createDotenvxPlugin } from '../src/plugin'

describe('bun-plugin-dotenvx', () => {
  const testEnvPath = join(import.meta.dir, '.env.test')
  const testEnvLocalPath = join(import.meta.dir, '.env.test.local')

  // Clean up any test files before and after tests
  beforeEach(() => {
    // Remove any existing test files
    if (existsSync(testEnvPath))
      unlinkSync(testEnvPath)
    if (existsSync(testEnvLocalPath))
      unlinkSync(testEnvLocalPath)

    // Reset test environment variables
    delete process.env.TEST_VAR
    delete process.env.OVERLOAD_TEST
    delete process.env.APP_PATH
    delete process.env.BASE_DIR
  })

  afterEach(() => {
    // Clean up test files
    if (existsSync(testEnvPath))
      unlinkSync(testEnvPath)
    if (existsSync(testEnvLocalPath))
      unlinkSync(testEnvLocalPath)

    // Reset test environment variables
    delete process.env.TEST_VAR
    delete process.env.OVERLOAD_TEST
    delete process.env.APP_PATH
    delete process.env.BASE_DIR
  })

  it('should load environment variables from a .env file', async () => {
    // Create a test .env file
    writeFileSync(testEnvPath, 'TEST_VAR=hello_world')

    // Create and register the plugin
    const dotenvxPlugin = createDotenvxPlugin({
      path: [testEnvPath],
    })

    await plugin(dotenvxPlugin)

    // Test that the environment variable was loaded
    expect(process.env.TEST_VAR).toBe('hello_world')
  })

  it('should respect the overload option with multiple files', async () => {
    // Create test .env files with different values
    writeFileSync(testEnvPath, 'OVERLOAD_TEST=first_value')
    writeFileSync(testEnvLocalPath, 'OVERLOAD_TEST=second_value')

    // Test with overload enabled (second file should win)
    const overloadPlugin = createDotenvxPlugin({
      path: [testEnvPath, testEnvLocalPath],
      overload: true,
    })

    await plugin(overloadPlugin)

    // The value should be from the second file
    expect(process.env.OVERLOAD_TEST).toBe('second_value')
  })

  it('should not overload by default (first file wins)', async () => {
    // Create test .env files with different values
    writeFileSync(testEnvPath, 'OVERLOAD_TEST=first_value')
    writeFileSync(testEnvLocalPath, 'OVERLOAD_TEST=second_value')

    // Test without overload (first file should win)
    const noOverloadPlugin = createDotenvxPlugin({
      path: [testEnvPath, testEnvLocalPath],
    })

    await plugin(noOverloadPlugin)

    // The value should be from the first file
    expect(process.env.OVERLOAD_TEST).toBe('first_value')
  })

  it('should support variable expansion', async () => {
    // Create a test .env file with variable expansion
    process.env.BASE_DIR = '/var/app'
    // Using a string literal to avoid template string linter error
    writeFileSync(testEnvPath, 'APP_PATH=$BASE_DIR/myapp')

    // Create and register the plugin
    const dotenvxPlugin = createDotenvxPlugin({
      path: [testEnvPath],
    })

    await plugin(dotenvxPlugin)

    // Test that the environment variable was expanded
    expect(process.env.APP_PATH).toBe('/var/app/myapp')
  })
})
