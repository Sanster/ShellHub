import React, {Component} from 'react'
import { ItemTypes } from './dndtypes'
import { DragSource } from 'react-dnd'

const hostSource = {
  beginDrag(props) {
    return {
      name: props.children,
    }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class TreeNode extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      connectDragSource,
      isDragging,
      children,
      isSelected,
      onContextMenu
    } = this.props

    let classNames = 'host'
    if(isSelected) {
      classNames += ' selected'
    }

    return connectDragSource(
      <div
        className={classNames}
        style={{opacity: isDragging ? 0.5 : 1}}
        onClick={this.props.onClick}
        onContextMenu={onContextMenu}>
        <div className="icon terminal" />
        {children}
      </div>
    )
  }
}

export default DragSource(ItemTypes.HOST, hostSource, collect)(TreeNode)