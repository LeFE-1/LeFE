const com = require.context('./src/components', true, /^\.\/.*\/index\.js$/)

export default com.keys().map(key => {
  const name = key.match(/\.\/(.*)\/.*/)
  const module = com(key).default
  return {
    name: name[1],
    module
  }
})
