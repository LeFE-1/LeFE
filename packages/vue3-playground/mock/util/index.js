const fs = require('fs'),
  { join } = require('path')
const RESTFUL_RE = /^(\/\w*)*$/
const prefix = join(__dirname, '../api')

// 检测是否为restful api
function isRestful(path) {
  return RESTFUL_RE.test(path)
}

function isFileExist(path) {
  let absolutePath = join(prefix, `${path}/index.js`)
  return new Promise((resolve, reject) => {
    fs.stat(absolutePath, err => {
      let result = {
        absolutePath
      }

      if (err) {
        result.state = false
        return reject(result)
      }

      result.state = true
      resolve(result)
    })
  })
}

const map = {}

async function searchMockData(path, method) {
  let { absolutePath, state } = await isFileExist(path)

  if (!state) return noop
  let hit =
    map[absolutePath] ||
    (map[absolutePath] = require(absolutePath)[method.toLowerCase()])

  return hit ? hit : noop
}

function watchMockChange() {
  fs.watch(
    prefix,
    {
      recursive: true
    },
    (type, filename) => {
      let absolutePath = join(prefix, filename)

      // 清空该文件缓存和map
      map[absolutePath] = null
      delete require.cache[require.resolve(absolutePath)]
    }
  )
}

function noop() {}

module.exports = {
  searchMockData,
  isRestful,
  watchMockChange
}
