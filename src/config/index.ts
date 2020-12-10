export const TOKEN_KEY_NAME: string = 'token'
export const TOKEN_TYPE_NAME: string = 'tokenType'

export const isProduction = process.env.NODE_ENV === 'production'
const BASE = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return ''
  }
  return ''
}
export const TOKEN_PREFIX = 'Bearer'
export const BASE_URL = BASE()
