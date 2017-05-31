import React, {Component} from 'react'
import { ItemTypes } from './dndtypes'
import { DropTarget } from 'react-dnd'
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

  }

  render() {
    const {
      connectDropTarget,
      isOver,
      name,
      isCollapsed,
      isSelected,
      addSession,
      onContextMenu
     } = this.props

    let folderArrowClass = 'icon'
    if (isCollapsed) {
      folderArrowClass += ' folder-collapsed-arrow'
    } else {
      folderArrowClass += ' folder-arrow'
    }

    let classNames = 'tree-view-folder'
    if(isSelected) {
      classNames += ' selected'
    }

    return connectDropTarget(
      <div
        className={classNames}
        onClick={this.props.onClick}
        onContextMenu={onContextMenu}>
        <div className={folderArrowClass}></div>
        <div className='icon folder'></div>
        <span>{name}</span>
      </div>
    )
  }
}

export default DropTarget(ItemTypes.HOST, folderTarget, collect)(TreeItem)