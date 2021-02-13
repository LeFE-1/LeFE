const EventEmitter = require('./src/eventEmitter')
const { md5 } = require('./src/md5')
const {
  template,
  getByChain,
  getDerivedState,
  createChain
} = require('./src/state')

export default {
  EventEmitter,
  md5,
  template,
  getByChain,
  getDerivedState,
  createChain
}
