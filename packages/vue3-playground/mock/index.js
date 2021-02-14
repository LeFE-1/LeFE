const { searchMockData, isRestful, watchMockChange } = require('./util/index')

function mockMiddleware() {
  // 监听接口文件的变动，随时更新
  watchMockChange()
  return function (req, res, next) {
    let accept = req.headers.accept

    if (!acceptsHtml(accept)) {
      if (isRestful(req.path)) {
        searchMockData(req.path, req.method)
          .then(data => {
            if (!data) return next()

            // 返回该数据
            res.header({
              'Content-Type': 'application/json; charset=utf-8',
              'X-Mock': 'proxy'
            })

            res.json(data(req))
          })
          .catch(e => next(e))
        return
      }

      // 未匹配mock数据或者不是restful api发起真实请求
      return next()
    }

    // 重定向
    req.url = '/index.html'
    next()
  }
}

function acceptsHtml(header) {
  let htmlAcceptHeaders = 'text/html'
  if (header.indexOf(htmlAcceptHeaders) !== -1) {
    return true
  }
  return false
}

module.exports = mockMiddleware
