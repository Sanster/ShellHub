import React, { Component } from 'react'
import io from 'socket.io-client'
import xterm from 'xterm'
import 'xterm/src/xterm.css'
import './style.less'

xterm.loadAddon('fit')

var term = new xterm({
  cursorBlink: true
})

var socket

class Terminal extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    term.open(this.termDiv)
    term.fit()
    socket = io.connect()

    socket.on('connect', () => {
      socket.emit('terminal resize', term.cols, term.rows)

      term.on('data', (data) => {
        socket.emit('data', data)
      })

      socket.on('data', (data) => {
        term.write(data)
      })

      socket.on('disconnect', function(err) {
        socket.io.reconnection(false)
      })

      socket.on('error', function(err) {
        console.error(err)
      })
    })
  }

  render() {
    return (
      <div className="terminal-container">
        <div
          className="terminal"
          ref={(div) => { this.termDiv = div }}>
        </div>
      </div>
    )
  }
}

export default Terminal
