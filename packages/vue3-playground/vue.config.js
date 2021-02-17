// const HyperDown = require('hyperdown')
// const parser = new HyperDown()
const mockMiddleware = require('./mock/index')

module.exports = {
  // chainWebpack: config => {
  //   config.module
  //     .rule('md')
  //     .test(/\.md/)
  //     .use('vue-loader')
  //     .loader('vue-loader')
  //     .end()
  //     .use('vue-markdown-loader')
  //     .loader('vue-markdown-loader/lib/markdown-compiler')
  //     .options({
  //       // markdown-it config
  //       preset: 'default',
  //       breaks: true,
  //       raw: true,
  //       typographer: true,
  //       preprocess: function (markdownIt, source) {
  //         return parser.makeHtml(source)
  //       }
  //     })
  // },
  devServer: {
    before(app) {
      app.use(mockMiddleware())
    }
  }
}
