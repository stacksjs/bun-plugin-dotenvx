# Variable Expansion Example

This example demonstrates how to use variable expansion with `bun-plugin-dotenvx`.

## Setup

First, install the plugin:

```bash
bun install -d bun-plugin-dotenvx
```

Then, add it to your `bunfig.toml`:

```toml
preload = [ "./node_modules/bun-plugin-dotenvx/dist/index.js" ]
```

## Create a .env File with Variable References

Create a `.env` file that references other variables:

```ini
# .env

# Base configuration
APP_NAME=my-awesome-app
APP_ENV=development
APP_PORT=3000

# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=secret
DB_NAME=mydb

# Constructed database URL using variable expansion
DATABASE_URL=postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}

# API configuration
API_VERSION=v1
API_BASE_URL=http://localhost:${APP_PORT}/api/${API_VERSION}

# Storage paths
STORAGE_ROOT=/var/data/${APP_NAME}
UPLOADS_DIR=${STORAGE_ROOT}/uploads
CACHE_DIR=${STORAGE_ROOT}/cache
```

## Use in Your Code

Now you can import your `.env` file and use the expanded variables:

```ts
// index.ts
import env from './.env'

console.log('Application Configuration:')
console.log(`App Name: ${env.APP_NAME}`)
console.log(`Environment: ${env.APP_ENV}`)
console.log(`Port: ${env.APP_PORT}`)

console.log('\nDatabase Configuration:')
console.log(`Database URL: ${env.DATABASE_URL}`)
// This will be expanded to: postgres://postgres:secret@localhost:5432/mydb

console.log('\nAPI Configuration:')
console.log(`API Base URL: ${env.API_BASE_URL}`)
// This will be expanded to: http://localhost:3000/api/v1

console.log('\nStorage Configuration:')
console.log(`Storage Root: ${env.STORAGE_ROOT}`)
console.log(`Uploads Directory: ${env.UPLOADS_DIR}`)
console.log(`Cache Directory: ${env.CACHE_DIR}`)
```

## Using System Environment Variables

You can also reference system environment variables in your `.env` file:

```ini
# .env

# Reference system environment variables
CURRENT_USER=${USER}
HOME_DIR=${HOME}
TEMP_DIR=${TMPDIR}

# Combine with your own variables
USER_WORKSPACE=${HOME_DIR}/workspace/${APP_NAME}
```

## Run Your Application

Run your application with Bun:

```bash
bun run index.ts
```

## How Variable Expansion Works

Variable expansion in dotenvx works by:

1. Parsing the `.env` file
2. Identifying variables enclosed in `${...}` syntax
3. Replacing them with their corresponding values
4. Supporting nested expansions (variables that reference other variables)

This feature is particularly useful for:

- Creating complex configuration strings from simpler components
- Avoiding duplication in your configuration
- Making your configuration more maintainable and readable
- Adapting to different environments automatically

## Best Practices

1. **Define base variables first**: Define simple variables before using them in complex expressions
2. **Use meaningful names**: Choose clear, descriptive variable names
3. **Group related variables**: Keep related configuration together
4. **Document complex expansions**: Add comments for complex variable expansions
5. **Avoid circular references**: Don't create variables that reference each other in a loop

For more advanced usage, check out the [Command Substitution Example](/examples/command-substitution) and [Advanced Configuration Example](/examples/advanced-configuration).
