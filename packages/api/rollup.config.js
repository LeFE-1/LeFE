const { join } = require('path')
const resolve = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')
const babel = require('rollup-plugin-babel')
const cwd = __dirname

const baseConfig = {
  input: join(cwd, 'index.js'),
  output: [
    {
      file: join(cwd, 'dist/index.js'),
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: join(cwd, 'dist/lefe.js'),
      format: 'umd',
      name: 'LeFE',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    resolve({
      preferBuiltins: false
    }),
    cjs(),
    babel({
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ]
    })
  ]
}
const esmConfig = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output, {
    sourcemap: true,
    format: 'es',
    file: join(cwd, 'dist/index.esm.js')
  })
})

function rollup() {
  const target = process.env.TARGET

  if (target === 'umd') {
    return baseConfig
  } else if (target === 'esm') {
    return esmConfig
  } else {
    return [baseConfig, esmConfig]
  }
}
module.exports = rollup()
