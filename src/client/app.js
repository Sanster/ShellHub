import React, { Component } from 'react'
import Sidebar from './components/sidebar'
import { Button, Menu,  } from 'semantic-ui-react'
import MenuToggleBtn from './components/menuToggleBtn'
import './style/app.less'
import Terminal from './components/terminal'
import TabMenu from './components/tabMenu'
import SessionAddDialog from './components/sessionAddDialog'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sidebarVisible: false,
      showSessionAddDialog: false,
      activeItem: 'bio',
      treeData: []
    }

    this.allFolders = new Map()
    this.allSessions = new Map()

    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.hideSessionAddDialog = this.hideSessionAddDialog.bind(this)
    this.addSession = this.addSession.bind(this)
  }

  fetchTreeData() {
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
    this.fetchTreeData()
  }

  toggleSidebar() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name })
  }

  addSession() {

  }

  hideSessionAddDialog() {
    this.setState({ showSessionAddDialog: false })
  }

  render() {
    const {
      sidebarVisible,
      activeItem,
      showSessionAddDialog,
      treeData
    } = this.state

    return(
      <div>
        <Sidebar
          visible={sidebarVisible}
          treeData={treeData}>
          <div className='app-content'>
            <TabMenu></TabMenu>
            <Terminal></Terminal>
            <MenuToggleBtn onClick={this.toggleSidebar}> </MenuToggleBtn>
          </div>
        </Sidebar>
        <SessionAddDialog
          open={showSessionAddDialog}
          onOk={this.addSession}
          onCancel={this.hideSessionAddDialog}>
        </SessionAddDialog>
      </div>
    )
  }
}