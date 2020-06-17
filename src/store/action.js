//同步示例
export function setArticleList (data) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_ARTICLELIST', data: data })
  }
}
export function setTagList (data) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_TAGLIST', data: data })
  }
}
export function setArchiveList (data) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_ARCHIVELIST', data: data })
  }
}
export function setBookList (data) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_BOOKLIST', data: data })
  }
}
export function setLineblogList (data) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_LINEBLOGLIST', data: data })
  }
}
export function setBlogInfo (data) {
  return (dispatch, getState) => {
    dispatch({ type: 'UPDATE_BLOGINFO', data: data })
  }
}
//异步
// export function setArticleList (data) {
//   return (dispatch, getState) => {
//     // 使用fetch实现异步请求
//     window.fetch('/api/getInfoList', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }).then(res => {
//         return res.json()
//     }).then(data => {
//         let { code, data } = data
//         if (code === 0) {
//           dispatch({ type: 'SET_INFO_LIST', data: data })
//         }
//     })
//   }
// }