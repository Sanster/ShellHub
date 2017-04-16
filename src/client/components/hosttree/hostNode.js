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
  render() {
    const { connectDragSource, isDragging, children } = this.props
    return connectDragSource(
      <div
        className="host"
        style={{opacity: isDragging ? 0.5 : 1}}>
        {children}
      </div>
    )
  }
}

export default DragSource(ItemTypes.HOST, hostSource, collect)(TreeNode)