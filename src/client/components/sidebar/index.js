import React, { Component } from 'react'
import { Sidebar, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
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

class SidebarRightOverlay extends Component {
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
            <HostTree data={treeData}></HostTree>
          </Sidebar>
          <Sidebar.Pusher>
            { children }
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
  }
}

export default SidebarRightOverlay
