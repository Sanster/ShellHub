import React, {Component} from 'react'
import { ItemTypes } from './dndtypes'
import { DropTarget } from 'react-dnd'
import ContextMenu from '../contextMenu'
import axios from 'axios'

const folderTarget = {
  drop(props, monitor) {
    console.log(monitor.getItem())
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class TreeItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showContextMenu: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.onAddSessionClick = this.onAddSessionClick.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick)
  }

  handleClick(e) {
    e.preventDefault()
    if (e.type === 'contextmenu') {
      console.log('right')
      this.setState({ showContextMenu: true })
    } else {
      const { showContextMenu } = this.state

      if (showContextMenu && e.target.contains !== this.contextMenu) {
        this.setState({ showContextMenu: false })
      }
    }
  }

  onAddSessionClick(e) {
    e.stopPropagation()
    console.log('add session click')

    axios.post('/api/session', {
      name: 'test',
      hostIP: '1.0.1.0',
      hostUser: 'cwq',
      sessionGroupId: '58f1b1feb3eded6fceed6391'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    const {
      connectDropTarget,
      isOver,
      name,
      isCollapsed
     } = this.props

    const { showContextMenu } = this.state

    let folderArrowClass = 'icon'
    if (isCollapsed) {
      folderArrowClass += ' folder-collapsed-arrow'
    } else {
      folderArrowClass += ' folder-arrow'
    }

    const contextMenu =
      <ContextMenu
        type="folder"
        onAddSessionClick={this.onAddSessionClick}
        ref={ref => {this.contextMenu = ref}}>
      </ContextMenu>

    return connectDropTarget(
      <div
        className="tree-view-folder"
        onContextMenu={this.handleClick}
        onClick={this.props.onClick}>
        { showContextMenu ? contextMenu : null }
        <div className={folderArrowClass}></div>
        <div className='icon folder'></div>
        <span>{name}</span>
      </div>
    )
  }
}

export default DropTarget(ItemTypes.HOST, folderTarget, collect)(TreeItem)