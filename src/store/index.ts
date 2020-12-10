import {enableLogging} from 'taro-mobx-logger'
import counterStore from './counter'
import userStore from './user'

const store = {
  counterStore,
  userStore
}
if (process.env.NODE_ENV !== 'production') {
  enableLogging(store)
}
export default store
