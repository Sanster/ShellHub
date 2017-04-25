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

    // const collapsedItems = new Map()
    // props.data.forEach(item => {
    //   collapsedItems.set(item.id, false)
    // })

    this.state = {
      collapsedItems: new Map(),
      selectedItemId: ''
    }

    this.collapse = this.collapse.bind(this)
    this.treeItemClick = this.treeItemClick.bind(this)
  }

  collapse(id) {
    console.log(`click ${id}`)
    const isCollapsed = this.state.collapsedItems.get(id)
    const aa = this.state.collapsedItems
    console.log(aa)
    aa.set(id, !isCollapsed)
    this.setState({collapsedItems: aa})
    this.treeItemClick(id)
  }

  treeItemClick(id) {
    this.setState({ selectedItemId: id })
  }

  getAllNodes(data) {
    const { collapsedItems } = this.state
    const list = []

    data.forEach(item => {
      if(item.children !== undefined) {
        let node = item.node
        let isSelected = node._id === this.state.selectedItemId
        let isCollapsed = this.state.collapsedItems.get(node._id)

        let folderClass
        if (isCollapsed) {
          folderClass = 'tree-view_children-collapsed'
        } else {
          folderClass = 'tree-view_children'
        }

        list.push(
          <div className='tree-view' key={node.name}>
            <FolderItem
              isSelected={isSelected}
              name={node.name}
              isCollapsed={isCollapsed}
              onClick={() => this.collapse(node._id)}>
            </FolderItem>
            {
              item.children.size ?
              <div className={folderClass}>
                { this.getAllNodes(item.children) }
              </div>
              : null
            }
          </div>
        )
      } else if(item.children === undefined) {
        let isSelected = item._id === this.state.selectedItemId

        list.push(
          <HostNode
            isSelected={isSelected}
            key={item.name}
            onClick={() => this.treeItemClick(item._id)}>
            {item.name}
          </HostNode>
        )
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
