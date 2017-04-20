import React, {Component} from 'react'
import { ItemTypes } from './dndtypes'
import { DropTarget } from 'react-dnd'
import folderCollapsedArrowIcon from './folderCollapsedArrow.svg'
import folderArrowIcon from './folderArrow.svg'
import folderIcon from './folder.svg'

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
  render() {
    const {
      connectDropTarget,
      isOver,
      name,
      isCollapsed
     } = this.props


    let folderArrowClass = 'icon'
    if (isCollapsed) {
      folderArrowClass += ' folder-collapsed-arrow'
    } else {
      folderArrowClass += ' folder-arrow'
    }

    return connectDropTarget(
      <div
        className="tree-view-folder"
        onClick={this.props.onClick}>
        <div className={folderArrowClass}></div>
        <div className='icon folder'></div>
        <span>{name}</span>
      </div>
    )
  }
}

export default DropTarget(ItemTypes.HOST, folderTarget, collect)(TreeItem)