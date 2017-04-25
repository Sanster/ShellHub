import React, {Component} from 'react'
import { ItemTypes } from './dndtypes'
import { DropTarget } from 'react-dnd'
import ContextMenu from '../contextMenu'
import SessionAddDialog from '../sessionAddDialog'

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
      showContextMenu: false,
      showSessionAddDialog: false
    }

    this.handleClick = this.handleClick.bind(this)
    this.onAddSessionClick = this.onAddSessionClick.bind(this)
    this.hideSessionAddDialog = this.hideSessionAddDialog.bind(this)
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

    this.setState({ showSessionAddDialog: true })
  }

  hideSessionAddDialog(){
    this.setState({ showSessionAddDialog: false })
  }

  render() {
    const {
      connectDropTarget,
      isOver,
      name,
      isCollapsed,
      isSelected,
      addSession
     } = this.props

    const {
      showContextMenu,
      showSessionAddDialog
    } = this.state

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

    let classNames = 'tree-view-folder'
    if(isSelected) {
      classNames += ' selected'
    }

    return connectDropTarget(
      <div
        className={classNames}
        onContextMenu={this.handleClick}
        onClick={this.props.onClick}>
        <SessionAddDialog
          open={showSessionAddDialog}
          onOk={addSession}
          sessionGroupId={this.props.sessionGroupId}
          onCancel={this.hideSessionAddDialog}>
        </SessionAddDialog>
        { showContextMenu ? contextMenu : null }
        <div className={folderArrowClass}></div>
        <div className='icon folder'></div>
        <span>{name}</span>
      </div>
    )
  }
}

export default DropTarget(ItemTypes.HOST, folderTarget, collect)(TreeItem)