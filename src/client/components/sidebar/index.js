import React, { Component } from 'react'
import { Sidebar, Button, Menu, Header, Segment } from 'semantic-ui-react'
import HostTree from '../hosttree'
import './style.less'
import axios from 'axios'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      treeData: []
    }

    this.allFolders = new Map()
    this.allSessions = new Map()
  }

  getTreeData() {
    axios.get('/api/session')
      .then(res => {
        const sessionsGrouped = res.data

        for( let i=0; i < sessionsGrouped.length; ++i) {
          const group = sessionsGrouped[i]
          const sessionGroup = group.sessionGroup

          const treeFolder = {}
          treeFolder.node = sessionGroup
          treeFolder.children = new Map()

          group.children.forEach( session => {
            this.allSessions.set(session._id, session)
            treeFolder.children.set(session._id, session)
          })

          this.allFolders.set(group._id, treeFolder)
        }

        const treeData = this.getFolderTree(this.allFolders)
        this.setState({ treeData })
      })
  }

  getFolderTree(folders) {
    const tree = []
    folders.forEach( folder => {
      if (folder.node.parent) {
        const parentFolder = folders.get(folder.node.parent)
        parentFolder.children.set(folder.node._id, folder)
      } else {
        tree.push(folder)
      }
    })
    return tree.slice()
  }

  componentDidMount() {
    this.getTreeData()
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
