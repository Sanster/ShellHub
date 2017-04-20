import React, { Component } from 'react'
import Sidebar from './components/sidebar'
import { Button, Menu,  } from 'semantic-ui-react'
import MenuToggleBtn from './components/menuToggleBtn'
import './style/app.less'
import Terminal from './components/terminal'
import TabMenu from './components/tabMenu'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sidebarVisible: false,
      activeItem: 'bio'
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  toggleSidebar() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  render() {
    const { sidebarVisible, activeItem } = this.state

    return(
      <div>
        <Sidebar
          visible={sidebarVisible}>
          <div className='app-content'>
            <TabMenu></TabMenu>
            <Terminal></Terminal>
            <MenuToggleBtn onClick={this.toggleSidebar}> </MenuToggleBtn>
          </div>
        </Sidebar>
      </div>
    )
  }
}