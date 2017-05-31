import React, { Component } from 'react'
import { Sidebar, Button, Menu, Header, Segment } from 'semantic-ui-react'
import HostTree from '../hosttree'
import './style.less'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      visible,
      children,
      treeData
     } = this.props

    return (
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            visible={visible}
            icon='labeled'
            vertical
            inverted>
            <Segment vertical>
              <div className='sidebar-header'>
                <h2 className='sidebar-title'>Sessions</h2>
              </div>
            </Segment>
            <HostTree data={treeData}>
            </HostTree>
          </Sidebar>
          { children }
        </Sidebar.Pushable>
    )
  }
}

export default SidebarMenu
