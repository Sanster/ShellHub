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
    this.handleContextMenuClick = this.handleContextMenuClick.bind(this)

    this.state = {
      showContextMenu: false
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleContextMenuClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleContextMenuClick)
  }

  handleClick(e) {
    console.log('menu left click')
  }

  handleContextMenuClick(e) {
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
    const { connectDragSource, isDragging, children, isSelected } = this.props
    const { showContextMenu } = this.state

    const contextMenu =
      <ContextMenu
        type="host"
        ref={ref => {this.contextMenu = ref}}>
      </ContextMenu>

    let classNames = 'host'
    if(isSelected) {
      classNames += ' selected'
    }

    return connectDragSource(
      <div
        className={classNames}
        style={{opacity: isDragging ? 0.5 : 1}}
        onClick={this.props.onClick}
        onContextMenu={this.handleContextMenuClick}>
        <div className="icon terminal" />
        { showContextMenu ? contextMenu : null }
        {children}
      </div>
    )
  }
}

export default DragSource(ItemTypes.HOST, hostSource, collect)(TreeNode)