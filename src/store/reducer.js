// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from 'redux'
// 默认值
import defaultState from './state.js'

// 一个reducer就是一个函数
function bookList (state = defaultState.bookList, action) {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'UPDATE_BOOKLIST':
      return action.data
    default:
      return state
  }
}

function articleList (state = defaultState.articleList, action) {
  switch (action.type) {
    case 'UPDATE_ARTICLELIST':
      return action.data
    default:
      return state
  }
}

function tagList (state = defaultState.tagList, action) {
  switch (action.type) {
    case 'UPDATE_TAGLIST':
      return action.data
    default:
      return state
  }
}

function archiveList (state = defaultState.archiveList, action) {
  switch (action.type) {
    case 'UPDATE_ARCHIVELIST':
      return action.data
    default:
      return state
  }
}

function lineblogList (state = defaultState.lineblogList, action) {
  switch (action.type) {
    case 'UPDATE_LINEBLOGLIST':
      return action.data
    default:
      return state
  }
}

function blogInfo (state = defaultState.blogInfo, action) {
  switch (action.type) {
    case 'UPDATE_BLOGINFO':
      return action.data
    default:
      return state
  }
}

// 导出所有reducer
export default combineReducers({
  bookList,
  articleList,
  tagList,
  archiveList,
  lineblogList,
  blogInfo
})