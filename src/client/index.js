import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import LoginPage from './pages/loginPage'
import { AppContainer } from 'react-hot-loader'

ReactDOM.render(
  <AppContainer>
   <App />
  </AppContainer>,
  document.getElementById('root')
)



//   // 测试删除 session
//   const backUpSession = allSessions.get(sessionId2Delete)
//   allSessions.delete(sessionId2Delete)
//   allFolders.get(sessionGroupId).children.delete(sessionId2Delete)
//   const deletedTree = getFolderTree(allFolders)
//   console.log(tree)

//   // 测试添加 session
//   allSessions.set(backUpSession._id, backUpSession)
//   allFolders.get(backUpSession.sessionGroupId).children.set(backUpSession._id, backUpSession)