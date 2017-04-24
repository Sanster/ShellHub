import React, { Component } from 'react'
import './style.less'

class ContextMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { type, onAddSessionClick } = this.props

    if (type === 'host') {
      return (
        <div className="context-menu">
          <div className="context-menu-option">Delete</div>
          <div className="context-menu-option">Properity</div>
        </div>
      )
    } else if (type === 'folder') {
      return (
        <div className="context-menu">
          <div className="context-menu-option" onClick={onAddSessionClick}>Add</div>
        </div>
      )
    }
  }
}

export default ContextMenu