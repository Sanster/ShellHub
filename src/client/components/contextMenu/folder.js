import React, { Component } from 'react'
import './style.less'

class FolderContextMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { onAddSessionClick } = this.props

    return (
      <div className="context-menu">
        <div className="context-menu-option" onClick={onAddSessionClick}>Add</div>
      </div>
    )
  }
}

export default FolderContextMenu