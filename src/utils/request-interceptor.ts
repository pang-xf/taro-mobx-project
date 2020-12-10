import Taro from '@tarojs/taro'
import { TOKEN_KEY_NAME, TOKEN_TYPE_NAME } from '@/config'

const interceptor = function(chain) {
  const requestParams = chain.requestParams
  let { header } = requestParams
  header = header || {}
  if (!header['Accept']) {
    header['Accept'] = 'application/json; charset=utf-8'
  }
  const token = Taro.getStorageSync(TOKEN_KEY_NAME)
  const tokenType = Taro.getStorageSync(TOKEN_TYPE_NAME)
  if (token) {
    header['Authorization'] = `${tokenType}${token}`
  }
  if (!header['content-type']) {
    header['content-type'] = 'application/json'
  }
  requestParams.header = header
  return chain.proceed(requestParams)
    .then(res => {
      return res
    })
}
export default interceptor
