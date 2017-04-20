import React, { Component } from 'react'
import { Sidebar, Button, Menu, Header, Segment } from 'semantic-ui-react'
import HostTree from '../hosttree'
import './style.less'

const treeData = [
  {name: 'Shanghai', id: 1, children: []},
  {name: 'Chengdu', id: 2, children: [
    {name: '10.182.1.2'},
    {name: '10.88.1.2'},
    {name: 'Lab A', id: 3, children: [
      {name: '8.8.8.8'},
      {name: '7.7.7.7'},
      {name: '9.9.9.9'},
    ]}
  ]},
  {name: 'Nanjin', id: 4, children: []},
]

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { visible, children } = this.props
    return (
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            visible={visible}
            icon='labeled'
            vertical
            inverted
          >
          <Segment vertical>
            <div className='sidebar-header'>
              <h2 className='sidebar-title'>Sessions</h2>
            </div>
          </Segment>
          <HostTree data={treeData}></HostTree>
          </Sidebar>
          { children }
        </Sidebar.Pushable>
    )
  }
}

export default SidebarMenu
