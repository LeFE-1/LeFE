const EventEmitter = require('./src/eventEmitter')
const { md5 } = require('./src/md5')
const {
  template,
  getByChain,
  getDerivedState,
  createChain
} = require('./src/state')
const {
  traversal,
  parseProps,
  parseValue,
  parseValueWithData,
  tpl
} = require('./src/parse')

export default {
  EventEmitter,
  md5,
  template,
  getByChain,
  getDerivedState,
  createChain,
  traversal,
  parseProps,
  parseValue,
  parseValueWithData,
  tpl
}
