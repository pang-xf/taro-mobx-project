import { action, configure, observable } from 'mobx'

// never 可以在任意地方修改状态 (默认)
// always 状态始终需要通过动作来更新(实际上还包括创建)
// observed 在某处观察到的所有状态都需要通过动作进行更改 不允许在动作之外进行状态修改
configure({ enforceActions: 'observed' })
const timeout = (time = 2000) => new Promise(r => setTimeout(() => r(), time))
const INIT_DATA = () => ({
  counter: 0,
  data: [
    {a: 123}
  ],
  state: 'pending' // 'pending' / 'done' / 'error'
})
class CounterStore {
  state = observable(INIT_DATA())

  @action.bound
  reset() {
    Object.keys(INIT_DATA()).forEach(key => (this.state[key] = INIT_DATA()[key]))
  }
  @action.bound
  counterStore() {
    this.state.counter++
  }
  @action.bound
  setValue(type, val) {
    this.state[type] = val
  }
  @action.bound
  increment() {
    this.state.counter++
  }
  @action.bound
  changeData() {
    let json = {
      a: 2
    }
    this.state.data.push(json)
  }
  @action.bound
  decrement() {
    this.state.counter--
  }

  @action.bound
  incrementAsync() {
    setTimeout(() => {
      this.state.counter++
    }, 1000)
  }
  @action.bound
  async ajax() {
    this.state.state = 'pending'
    await timeout()
    this.state.state = 'done'
  }
}
export default new CounterStore()
