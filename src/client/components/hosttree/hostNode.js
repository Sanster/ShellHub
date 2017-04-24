import React, {Component} from 'react'
import { ItemTypes } from './dndtypes'
import { DragSource } from 'react-dnd'
import ContextMenu from '../contextMenu'

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

    this.handleClick = this.handleClick.bind(this)

    this.state = {
      showContextMenu: false
    }
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

  render() {
    const { connectDragSource, isDragging, children } = this.props
    const { showContextMenu } = this.state

    const contextMenu =
      <ContextMenu
        type="host"
        ref={ref => {this.contextMenu = ref}}>
      </ContextMenu>

    return connectDragSource(
      <div
        className="host"
        style={{opacity: isDragging ? 0.5 : 1}}
        onContextMenu={this.handleClick}>
        <div className="icon terminal" />
        { showContextMenu ? contextMenu : null }
        {children}
      </div>
    )
  }
}

export default DragSource(ItemTypes.HOST, hostSource, collect)(TreeNode)