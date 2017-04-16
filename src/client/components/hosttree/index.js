import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import HostNode from './hostNode'
import FolderItem from './folderItem'
import './style.less'

class TreeView extends Component {
  constructor(props) {
    super(props)

    const collapsedItems = new Map()
    props.data.forEach(item => {
      collapsedItems.set(item.id, false)
    })

    console.log(collapsedItems)
    this.state = {
      collapsedItems
    }

    this.collapse = this.collapse.bind(this)
  }

  collapse(id) {
    console.log(`click ${id}`)
    const isCollapsed = this.state.collapsedItems.get(id)
    const aa = this.state.collapsedItems
    console.log(aa)
    aa.set(id, !isCollapsed)
    this.setState({collapsedItems: aa})
  }

  getAllNodes(data) {
    const { collapsedItems } = this.state

    const list = data.map(item => {
      if(item.children !== undefined) {
        let folderClass = 'tree-view_children'
        if (this.state.collapsedItems.get(item.id)) {
          folderClass += '-collapsed'
        }

        return (
          <div className='tree-view' key={item.name}>
            <FolderItem onClick={() => this.collapse(item.id)}>
              <span>{item.name}</span>
            </FolderItem>
            {
              item.children.length ?
              <div className={folderClass}>
                { this.getAllNodes(item.children) }
              </div>
              : null
            }
          </div>
        )
      } else if(item.children === undefined) {
        return <HostNode key={item.name}>{item.name}</HostNode>
      }
    })

    return list
  }

  render() {
    const { data } = this.props

    const allNodes = this.getAllNodes(data)

    return (
      <div className="host-tree">
        {allNodes}
      </div>
    )
  }
}


TreeView.propTypes = {
  data: PropTypes.array,
}

export default DragDropContext(HTML5Backend)(TreeView)
