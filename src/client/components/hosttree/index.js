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
import classNames from 'classnames'

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

  getTreeRows(data, depth = 1){
    let list = []

    data.forEach(item => {
      let style = {
        paddingLeft: 12 * depth
      }

      // item 文件夹
      if(item.children !== undefined) {
        let node = item.node


        list.push(
          <div className='host-tree-row folder' key={node._id} style={style}>
            <FolderItem
              addSession={this.addSession}
              onContextMenu={(e) => this.handleContextMenu(e, 'folder', node._id)}
              name={node.name}
              sessionGroupId={node._id}
              onClick={() => this.collapse(node._id)}>
            </FolderItem>
          </div>
        )

        if(item.children.size > 0){
          list = list.concat(this.getTreeRows(item.children, depth + 1))
        }
      }
      else {
        // 这里的箭头为 icon.padding-right + 箭头的宽度
        style.paddingLeft += 20

        list.push(
          <div className="host-tree-row" key={item._id} style={style}>
            <HostNode
              onContextMenu={(e) => this.handleContextMenu(e, 'host', item._id)}
              onClick={() => this.hostNodeClick(item._id)}>
             {item.name}
           </HostNode>
          </div>
        )
      }
    })

    return list
  }

  render() {
    const {
      showContextMenu,
      contextMenuType
    } = this.state

    const { data } = this.props

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

    const treeRows = this.getTreeRows(data)

    return (
      <div className="host-tree">
        { showContextMenu ? contextMenu : null }
        <div className="host-tree-rows">
          { treeRows }
        </div>
      </div>
    )
  }
}


TreeView.propTypes = {
  data: PropTypes.array,
}

export default DragDropContext(HTML5Backend)(TreeView)
