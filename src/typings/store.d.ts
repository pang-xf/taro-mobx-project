declare namespace MobxStore {
  interface counterStore {
    state: {
      counter: number
      data: object[]
      state: string
    }
    increment: Function
    decrement: Function
    changeData: Function
    incrementAsync: Function
    ajax: Function
    reset: Function
  }
  interface userStore {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}
