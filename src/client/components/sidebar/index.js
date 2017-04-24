import React, { Component } from 'react'
import { Sidebar, Button, Menu, Header, Segment } from 'semantic-ui-react'
import HostTree from '../hosttree'
import './style.less'
import axios from 'axios'

// const treeData = [
//   {name: 'Shanghai', id: 1, children: []},
//   {name: 'Chengdu', id: 2, children: [
//     {name: '10.182.1.2'},
//     {name: '10.88.1.2'},
//     {name: 'Lab A', id: 3, children: [
//       {name: '8.8.8.8'},
//       {name: '7.7.7.7'},
//       {name: '9.9.9.9'},
//     ]}
//   ]},
//   {name: 'Nanjin', id: 4, children: []},
// ]

class SidebarMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      treeData: []
    }
  }

  componentDidMount() {
    axios .get('/api/session')
      .then(res => {
        const sessionsGrouped = res.data

        const allFolders = new Map()
        const allSessions = new Map()

        for( let i=0; i < sessionsGrouped.length; ++i) {
          const group = sessionsGrouped[i]
          const sessionGroup = group.sessionGroup

          const treeFolder = {}
          treeFolder.node = sessionGroup
          treeFolder.children = new Map()

          group.children.forEach( session => {
            allSessions.set(session._id, session)
            treeFolder.children.set(session._id, session)
          })

          allFolders.set(group._id, treeFolder)
        }

        function getFolderTree(allFolders) {
          const tree = []
          allFolders.forEach( folder => {
            if (folder.node.parent) {
              const parentFolder = allFolders.get(folder.node.parent)
              parentFolder.children.set(folder.node._id, folder)
            } else {
              tree.push(folder)
            }
          })
          return tree.slice()
        }

        const treeData = getFolderTree(allFolders)
        this.setState({ treeData })
      })
  }

  render() {
    const { visible, children } = this.props
    const { treeData } = this.state

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
