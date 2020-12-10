import React, { Component } from 'react'
import { View } from '@tarojs/components'
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
  componentWillMount() {}

  componentDidMount() {}

  render() {
    console.log('----this.props----', this.props)
    return (
      <View className='index'>
        用户页
      </View>
    )
  }
}

export default Index
