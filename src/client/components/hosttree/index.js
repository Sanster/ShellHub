import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import HostNode from './hostNode'
import FolderItem from './folderItem'
import axios from 'axios'
import './style.less'
import FolderContextMenu from '../contextMenu/folder.js'
import HostContextMenu from '../contextMenu/host.js'

class TreeView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      collapsedItems: new Map(),
      selectedItemId: '',
      showContextMenu: false,
      contextMenuType: ''
    }

    this.collapse = this.collapse.bind(this)
    this.treeItemClick = this.hostNodeClick.bind(this)
    this.addSession = this.addSession.bind(this)
    this.handleContextMenu = this.handleContextMenu.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  collapse(id) {
    console.log(`click ${id}`)
    const isCollapsed = this.state.collapsedItems.get(id)
    const aa = this.state.collapsedItems
    console.log(aa)
    aa.set(id, !isCollapsed)
    this.setState({collapsedItems: aa})
    this.hostNodeClick(id)
  }

  hostNodeClick(id) {
    this.setState({ selectedItemId: id })
  }

  addSession(sessionData) {
    axios.post('/api/session', {
      name: sessionData.name,
      hostIP: sessionData.hostIP,
      hostUser: sessionData.hostUser,
      sessionGroupId: sessionData.sessionGroupId
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  getAllNodes(data) {
    const { collapsedItems } = this.state
    const list = []

    data.forEach(item => {
      if(item.children !== undefined) {
        let node = item.node
        let isSelected = node._id === this.state.selectedItemId
        let isCollapsed = this.state.collapsedItems.get(node._id)

        let folderClass
        if (isCollapsed) {
          folderClass = 'tree-view_children-collapsed'
        } else {
          folderClass = 'tree-view_children'
        }

        list.push(
          <div className='tree-view' key={node.name}>
            <FolderItem
              addSession={this.addSession}
              isSelected={isSelected}
              onContextMenu={(e) => this.handleContextMenu(e, 'folder', node._id)}
              name={node.name}
              isCollapsed={isCollapsed}
              sessionGroupId={node._id}
              onClick={() => this.collapse(node._id)}>
            </FolderItem>
            {
              item.children.size ?
              <div className={folderClass}>
                { this.getAllNodes(item.children) }
              </div>
              : null
            }
          </div>
        )
      } else if(item.children === undefined) {
        let isSelected = item._id === this.state.selectedItemId

        list.push(
          <HostNode
            onContextMenu={(e) => this.handleContextMenu(e, 'host', item._id)}
            isSelected={isSelected}
            key={item.name}
            onClick={() => this.hostNodeClick(item._id)}>
            {item.name}
          </HostNode>
        )
      }
    })

    return list
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  handleClick(e) {
    if (e.type === 'contextmenu') return

    e.preventDefault()
    const { showContextMenu } = this.state

    if (showContextMenu && e.target.contains !== this.contextMenu) {
      this.setState({ showContextMenu: false })
    }
  }

  handleContextMenu(event, type, id) {
    event.preventDefault()

    this.setState({
      showContextMenu: true,
      contextMenuType: type
    })

    console.log(this.contextMenu)
    const clickX = event.clientX
    const clickY = event.clientY
    const screenW = window.innerWidth
    const screenH = window.innerHeight
    const rootW = this.contextMenu.offsetWidth
    const rootH = this.contextMenu.offsetHeight

    const right = (screenW - clickX) > rootW
    const left = !right
    const top = (screenH - clickY) > rootH
    const bottom = !top

    if (right) {
      this.contextMenu.style.left = `${clickX + 5}px`
    }

    if (left) {
      this.contextMenu.style.left = `${clickX - rootW - 5}px`
    }

    if (top) {
      this.contextMenu.style.top = `${clickY + 5}px`
    }

    if (bottom) {
      this.contextMenu.style.top = `${clickY - rootH - 5}px`
    }
  }

  render() {
    const {
      showContextMenu,
      contextMenuType
    } = this.state

    let contextMenu = null

    if (contextMenuType === 'folder') {
      contextMenu =
        <FolderContextMenu
          onAddSessionClick={this.onAddSessionClick}
          ref={ref => {this.contextMenu = ref}}>
        </FolderContextMenu>
    } else if (contextMenuType === 'host'){
      contextMenu =
        <HostContextMenu
          ref={ref => {this.contextMenu = ref}}>
        </HostContextMenu>
    }

    const { data } = this.props

    const allNodes = this.getAllNodes(data)

    return (
      <div className="host-tree">
        { showContextMenu ? contextMenu : null }
        { allNodes }
      </div>
    )
  }
}


TreeView.propTypes = {
  data: PropTypes.array,
}

export default DragDropContext(HTML5Backend)(TreeView)
