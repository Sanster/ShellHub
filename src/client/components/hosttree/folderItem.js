import React, {Component} from 'react'
import { ItemTypes } from './dndtypes'
import { DropTarget } from 'react-dnd'

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
    const { connectDropTarget, isOver, children } = this.props

    return connectDropTarget(
      <div className="tree-view_item" onClick={this.props.onClick}>
        {children}
      </div>
    )
  }
}

export default DropTarget(ItemTypes.HOST, folderTarget, collect)(TreeItem)