import React, { Component } from 'react'
import './style.less'

class HostContextMenu extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="context-menu">
        <div className="context-menu-option">Delete</div>
        <div className="context-menu-option">Properity</div>
      </div>
    )
  }
}

export default HostContextMenu