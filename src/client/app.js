import React, { Component } from 'react'
import Sidebar from './components/sidebar'
import { Button } from 'semantic-ui-react'
import './style/app.less'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sidebarVisible: false
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  toggleSidebar() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  render() {
    const { sidebarVisible } = this.state

    return(
      <div>
        <Button
          basic
          onClick={this.toggleSidebar}
          color='green'>
          Green
        </Button>
        <Sidebar
          visible={sidebarVisible}>
          <div className='app-content'></div>
        </Sidebar>
      </div>
    )
  }
}