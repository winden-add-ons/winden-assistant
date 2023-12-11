buildPlugin({
  entryPoints: ['src/main.js'],
  outfile: 'dist/assistant.min.js',
})

function buildPlugin(buildOptions) {
  return require('esbuild').buildSync({
    ...buildOptions,
    minify: true,
    bundle: true,
  })
}
