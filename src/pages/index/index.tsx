import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from 'mobx-react'

import './index.scss'

type PageStateProps = {
  counterStore: MobxStore.counterStore
  userStore: MobxStore.userStore
}

interface Index {
  props: PageStateProps
}

@inject('counterStore', 'userStore')
@observer
class Index extends Component {
  async componentDidMount() {
    console.log('----this.props----', this.props)
    await this.props.counterStore.ajax()
  }

  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }
  increment2 = () => {
    const { userStore } = this.props
    userStore.increment()
  }

  decrement2 = () => {
    const { userStore } = this.props
    userStore.decrement()
  }

  incrementAsync2 = () => {
    const { userStore } = this.props
    userStore.incrementAsync()
  }
  reset = () => {
    const { counterStore } = this.props
    counterStore.reset()
  }
  changeData = ()  => {
    const { counterStore } = this.props
    counterStore.changeData()
  }
  hrefPage = () => {
    Taro.navigateTo({
      url: '/pages/user/index'
    })
  }
  render() {
    const {
      state: {counter}
    } = this.props.counterStore
    const userCounter = this.props.userStore.counter
    return (
      <View className='index'>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
        <Button onClick={this.incrementAsync}>Add Async</Button>
        <Text>{counter}</Text>
        <Button onClick={this.changeData}>改变data值</Button>
        <Button onClick={this.reset}>重置</Button>
        <Button onClick={this.increment2}>+</Button>
        <Button onClick={this.decrement2}>-</Button>
        <Button onClick={this.incrementAsync2}>Add Async</Button>
        <Text>{userCounter}</Text>
        <Button onClick={this.hrefPage}>跳转</Button>
      </View>
    )
  }
}

export default Index
