import React, { Component } from 'react'

class TabItem extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      children,
      active,
      onClick,
      onClose
    } = this.props

    let itemClass = 'tab-item'
    if (active) {
      itemClass += ' active'
    }

    return (
      <div className={itemClass} onClick={onClick}>
        <span>
          {children}
        </span>
        <div
          className="tab-item-close-btn"
          onClick={onClose}
        >
          cl
        </div>
      </div>
    )
  }
}

export default TabItem
