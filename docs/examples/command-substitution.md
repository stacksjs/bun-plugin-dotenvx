# Command Substitution Example

This example demonstrates how to use command substitution with `bun-plugin-dotenvx`.

## Setup

First, install the plugin:

```bash
bun install -d bun-plugin-dotenvx
```

Then, add it to your `bunfig.toml`:

```toml
preload = [ "./node_modules/bun-plugin-dotenvx/dist/index.js" ]
```

## Create a .env File with Command Substitution

Create a `.env` file that includes command outputs:

```ini
# .env

# System information using command substitution
CURRENT_USER=$(whoami)
HOSTNAME=$(hostname)
CURRENT_DIR=$(pwd)

# Git information
GIT_BRANCH=$(git branch --show-current)
GIT_COMMIT=$(git rev-parse --short HEAD)
GIT_REPO=$(basename -s .git $(git config --get remote.origin.url))

# Date and time information
BUILD_DATE=$(date +%Y-%m-%d)
BUILD_TIME=$(date +%H:%M:%S)
BUILD_TIMESTAMP=$(date +%s)

# Random values
RANDOM_UUID=$(uuidgen || cat /proc/sys/kernel/random/uuid)
RANDOM_STRING=$(openssl rand -hex 8)

# System resources
AVAILABLE_MEMORY=$(free -m | awk '/Mem:/ {print $7}')
CPU_CORES=$(nproc || sysctl -n hw.ncpu)
```

## Use in Your Code

Now you can import your `.env` file and use the values from command substitution:

```ts
// index.ts
import env from './.env'

console.log('System Information:')
console.log(`Current User: ${env.CURRENT_USER}`)
console.log(`Hostname: ${env.HOSTNAME}`)
console.log(`Current Directory: ${env.CURRENT_DIR}`)

console.log('\nGit Information:')
console.log(`Git Branch: ${env.GIT_BRANCH}`)
console.log(`Git Commit: ${env.GIT_COMMIT}`)
console.log(`Git Repository: ${env.GIT_REPO}`)

console.log('\nBuild Information:')
console.log(`Build Date: ${env.BUILD_DATE}`)
console.log(`Build Time: ${env.BUILD_TIME}`)
console.log(`Build Timestamp: ${env.BUILD_TIMESTAMP}`)

console.log('\nRandom Values:')
console.log(`Random UUID: ${env.RANDOM_UUID}`)
console.log(`Random String: ${env.RANDOM_STRING}`)

console.log('\nSystem Resources:')
console.log(`Available Memory (MB): ${env.AVAILABLE_MEMORY}`)
console.log(`CPU Cores: ${env.CPU_CORES}`)
```

## Run Your Application

Run your application with Bun:

```bash
bun run index.ts
```

## Combining Command Substitution with Variable Expansion

You can combine command substitution with variable expansion:

```ini
# .env

# Base configuration
APP_NAME=my-awesome-app
APP_ENV=development

# Git information
GIT_BRANCH=$(git branch --show-current)
GIT_COMMIT=$(git rev-parse --short HEAD)

# Combined values
APP_VERSION=1.0.0-${GIT_BRANCH}-${GIT_COMMIT}
BUILD_INFO="${APP_NAME} v${APP_VERSION} (${APP_ENV}) built by $(whoami) on $(date +%Y-%m-%d)"
```

## Practical Use Cases

### 1. Dynamic Configuration

```ini
# .env
PORT=$(( 3000 + $(id -u) % 1000 ))
```

This creates a unique port number based on the user ID, useful for development environments where multiple developers need unique ports.

### 2. Environment-Specific Settings

```ini
# .env
IS_CI=$([ -n "$CI" ] && echo "true" || echo "false")
DEBUG=$([ "$APP_ENV" = "development" ] && echo "true" || echo "false")
```

### 3. Build Information

```ini
# .env
BUILD_NUMBER=$([ -n "$CI" ] && echo "$CI_BUILD_NUMBER" || echo "dev-$(date +%s)")
VERSION=$(cat package.json | jq -r '.version')
```

## Security Considerations

1. **Avoid sensitive commands**: Don't run commands that might expose sensitive information
2. **Consider performance**: Complex commands might slow down your application startup
3. **Handle command failures**: Commands might fail or not be available in all environments
4. **Sanitize outputs**: Be careful with command outputs that might contain special characters

## How Command Substitution Works

Command substitution in dotenvx works by:

1. Identifying commands enclosed in `$(...)` syntax
2. Executing these commands in a shell
3. Capturing the command output
4. Using the output as the value for the environment variable

This feature is particularly useful for:

- Dynamically generating configuration values
- Incorporating system information into your application
- Creating build-specific identifiers
- Adapting configuration based on the runtime environment

For more advanced usage, check out the [Advanced Configuration Example](/examples/advanced-configuration).
