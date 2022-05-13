import React, {Component} from 'react'
import {Provider} from 'mobx-react'
import store from '@/store'

import './app.scss'

class App extends Component {
  componentDidMount() {
    console.log('----第四次提交----')
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // this.props.children 就是要渲染的页面
  render() {
    return (
      <Provider {...store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
