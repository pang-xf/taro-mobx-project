const path = require('path')

const alias = (type) => {
  let func = function resolve(dir) {
    return path.resolve(__dirname, dir)
  }
  if (type === 'join') {
    func = function resolve(dir) {
      return path.join(__dirname, dir)
    }
  }
  return {
    '@/assets': func('src/assets'),
    '@/config': func('src/config'),
    '@/components': func('src/components'),
    '@/service': func('src/service'),
    '@/utils': func('src/utils'),
    '@/store': func('src/store'),
    '@/typings': func('src/typings'),
    '@/style': func('src/style'),
    '@/pages': func('src/pages'),
    '@/services': func('src/services')
  }
}
module.exports = alias
