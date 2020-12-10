export const isPro = process.env.NODE_ENV === 'production'
export const isDev = process.env.NODE_ENV === 'development'
export const isTest = process.env.BUILD === 'test' //这个跟 NODE_ENV不是一组，如果直接修改NODE_ENV 打包会出现兼容问题

export const prefix = (isDev && !isTest) ? '/dev' : ''

/**
 * 辅助文本
 * @param copyValue 待复制的文本
 * @param onOk 成功回调
 */
export const copyText = (copyValue: string, onOk?: () => void) => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', copyValue)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    onOk && onOk()
    document.body.removeChild(input)
  }
}

/**
 * 是否为iOS
 */
export const isIOS = () => {
  return navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i)
}

/**
 * 判断是否为移动设备
 * @return boolean
 */
export function isMobile() {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    isIOS() ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  )
}

/**
 * 判断是否微信浏览器
 * @return boolean
 */
export function isWeiXin() {
  const ua = window.navigator.userAgent.toLowerCase()
  const match = ua.match(/MicroMessenger/i)
  return match && match[0] === 'micromessenger'
}

/**
 * 判断是否支付宝环境
 * @return boolean
 */
export function isAliPay() {
  const ua = window.navigator.userAgent.toLowerCase()
  const match = ua.match(/AlipayClient/i)
  return match && match[0] === 'alipayclient'
}

/**
 * 获取链接里参数
 * @param {string} name 参数名
 */
export const getQueryString = (name: string) => {
  let search = window.location.hash.split('?')[1] || window.location.search.substr(1)
  let _reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = search.match(_reg)
  if (r != null) return unescape(r[2])
  return null
}
/**
 * 判断是否在苹果手机上
 */
export const isInIOSAppEnv = navigator.userAgent.indexOf('iosApp') > -1
