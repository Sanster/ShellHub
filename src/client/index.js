import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import Login from './login'

import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
  <AppContainer>
   <Login />
  </AppContainer>,
  document.getElementById('root')
)


//     const allFolders = new Map()
//     const allSessions = new Map()

//     for( let i=0; i < sessionsGrouped.length; ++i) {
//       const group = sessionsGrouped[i]

//       let sessionGroup = await SessionGroup.findById(ObjectId(group._id))
//       sessionGroup = JSON.stringify(sessionGroup)
//       sessionGroup = JSON.parse(sessionGroup)

//       const treeFolder = {}
//       treeFolder.node = sessionGroup
//       treeFolder.children = new Map()

//       group.children.forEach( session => {
//         allSessions.set(session._id, session)
//         treeFolder.children.set(session._id, session)
//       })

//       allFolders.set(group._id, treeFolder)
//     }

// function getFolderTree(allFolders) {
//     const tree = []
//     allFolders.forEach( folder => {
//       if (folder.node.parent) {
//         const parentFolder = allFolders.get(folder.node.parent)
//         parentFolder.children.set(folder.node._id, folder)
//       } else {
//         tree.push(folder)
//       }
//     })
//     return tree
// }

//   // 测试删除 session
//   const backUpSession = allSessions.get(sessionId2Delete)
//   allSessions.delete(sessionId2Delete)
//   allFolders.get(sessionGroupId).children.delete(sessionId2Delete)
//   const deletedTree = getFolderTree(allFolders)
//   console.log(tree)

//   // 测试添加 session
//   allSessions.set(backUpSession._id, backUpSession)
//   allFolders.get(backUpSession.sessionGroupId).children.set(backUpSession._id, backUpSession)