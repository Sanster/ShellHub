import React, { Component } from 'react'
import TabItem from './tabItem'
import './style.less'

class TabMenu extends Component {
  constructor(props) {
    super(props)

    const sessions = new Map()
    sessions.set('1', { ip: '127.0.0.1' })
    sessions.set('2', { ip: '127.0.0.1' })
    sessions.set('3', { ip: '127.0.0.1' })
    sessions.set('4', { ip: '127.0.0.1' })

    this.state = {
      activeItem: '1',
      sessions
    }

    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleItemClick(activeId) {
    this.setState({ activeItem: activeId })
  }

  handleItemClose(e, closeId) {
    e.stopPropagation()
    const sessions = this.state.sessions
    sessions.delete(closeId)
    this.setState(sessions)
  }

  render() {
    const { activeItem, sessions } = this.state

    const tabItems = []
    sessions.forEach((session, key) => {
      tabItems.push(<TabItem
                      key={key}
                      active={activeItem === key}
                      onClick={() => this.handleItemClick(key)}
                      onClose={(e) => this.handleItemClose(e, key)}>
                      {session.ip}
                    </TabItem>)
    })

    return (
      <div className="tab-menu">
        { tabItems }
      </div>
    )
  }
}

export default TabMenu
