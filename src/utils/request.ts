import Taro from '@tarojs/taro'
import {TOKEN_KEY_NAME} from '@/config'
import interceptor from './request-interceptor'

let logining = false

export function gotoLogin() {
  // 跳入登录
  if (logining) {
    return false
  }
  logining = true
  let redirectUrl = ''
  return Taro.redirectTo({
    url: '/pages/login/index' + redirectUrl,
    complete: () => {
      logining = false
    }
  })
}


Taro.addInterceptor(interceptor)
/**
 * 登录流程处理
 */
let isLogining = false
let timer = {}

export function doLogin(json) {
  return new Promise((resolve, reject) => {
    // let tokenExpired = Taro.getStorageSync(TOKEN_EXPIRED_KEY_NAME)
    // tokenExpired && tokenExpired - dayJs().unix() > 0
    if (isLogining) {
      // 正在登录中，请求轮询稍后，避免重复调用登录接口
      timer[json.url] = setTimeout(() => {
        doLogin(json)
          .then(res => {
            if (timer[json.url]) {
              clearTimeout(timer[json.url])
              timer[json.url] = undefined
            }
            resolve(res)
          })
          .catch(err => {
            if (timer[json.url]) {
              clearTimeout(timer[json.url])
              timer[json.url] = undefined
            }
            reject(err)
          })
      }, 500)
    } else {
      isLogining = true
      Taro.login({
        success: async (res) => {
          if (res.code) {
            let reqData = {
              code: res.code
            }
            try {
              let resp = await Taro.request({
                url: '/user/api/wx_default_login',
                method: 'POST',
                data: reqData
              })
              let data = resp.data.data
              // let _url = json.url
              if (resp.statusCode === 200 || resp.statusCode === 201) {
                isLogining = false
                if (resp.data.code === 0 || resp.data.code === 1) {
                  let tokenId = data[TOKEN_KEY_NAME]
                  Taro.setStorageSync(TOKEN_KEY_NAME, tokenId)
                  // let tokenExpiredAt = data[TOKEN_EXPIRED_KEY_NAME]
                  // Taro.setStorageSync(TOKEN_EXPIRED_KEY_NAME, tokenExpiredAt)
                  resolve(resp)
                } else {
                  Taro.showModal({
                    title: '请求错误',
                    showCancel: false,
                    content: resp.data.message
                  })
                  reject(resp)
                }

              } else {
                isLogining = false

              }
            } catch (e) {
              // 登录失败，解除锁，防止死锁
              isLogining = false
              let error = {errcode: 500, errmsg: e}
              reject(error)
            }
          } else {
            // 登录失败，解除锁，防止死锁
            Taro.hideLoading()
            isLogining = false
            let error = {errcode: 400, errmsg: '没有获取到code'}
            reject(error)
          }
        },
        fail: (err) => {
          Taro.hideLoading()
          // 登录失败，解除锁，防止死锁
          isLogining = false
          let error = {errcode: 402, errmsg: err}
          reject(error)
        }
      })
    }
  })
}

function requestSuccess(json) {
  return new Promise(async (resolve, reject) => {
    let tokenId = Taro.getStorageSync(TOKEN_KEY_NAME)
    // || !tokenExpired || tokenExpired - dayJs().unix() <= 0
    // 强制登录，当session-key 过期就强制登录
    let forceLogin = false
    console.log('----json.url 打印：', json.url, json.url.indexOf('/wx_quick_login'))
    if ((process.env.TARO_ENV === 'weapp' && json.url.indexOf('/wx_quick_login')) > 0) {
      try {
        await Taro.checkSession()
      } catch (e) {
        forceLogin = true
        console.log('----强制登录开启 打印：', forceLogin)
      }
    }
    if ((!tokenId && !json.unAuth) || forceLogin) {
      gotoLogin()
    }
    try {
      let data = await Taro.request(json)
      let {code} = data.data
      // 判断订单是否重复 重复码20002
      if (data.statusCode === 200 || data.statusCode === 201) {
        if (code === 0) {
          resolve(data.data.data)
        } else {
          // token 校验失败
          if (code === 110000 || code === 110001) {
            return gotoLogin()
          }
          // customError 可以定制自定义报错
          if (!json.customError) {
            Taro.showModal({title: '请求错误', content: data.data.message, showCancel: false})
            return reject(data.data)
          }
          reject(data.data)
        }
      } else {
        // customError 可以定制自定义报错
        if (!json.customError) {
          Taro.showModal({title: '请求错误', content: data.data.message || '服务器错误', showCancel: false})
          return reject(data.data)
        }
        reject(data.data)
      }
    } catch (e) {
      if (!json.customError) {
        handleError(e)
      }
      reject(e)
    }
  })
}

function handleError(e) {
  console.log(e)
  return Taro.showModal({title: e.status ? e.status.toString() : '提示', content: e.statusText, showCancel: false})
}

function request<T>(json) {
  return new Promise<T>(async (resolve, reject) => {
    try {
      let data = await requestSuccess(json)
      resolve(data as T)
    } catch (e) {
      reject(e)
    }
  })
}

export default request
