import { dts } from 'bun-plugin-dtsx'

console.log('Building...')

await Bun.build({
  entrypoints: [
    './src/index.ts',
    './src/plugin.ts',
  ],
  outdir: './dist',
  target: 'bun',
  minify: true,
  splitting: true,

  plugins: [
    dts(),
  ],
})

console.log('Built!')
