import loginService from '../services/login'
import blogsService from '../services/blogs'

const userLocalStorageKey = 'loggedBlogappUser'

const reducer = (state = {username:null, name:null}, action) => {
  switch (action.type) {
    case 'INIT_LOGIN':
      return action.data
    case 'LOGOUT':
      return {username:null, name:null}
    case 'LOGIN':
      return action.data
    default:
      return state
  }
}

export const initializeLogin = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem(userLocalStorageKey)
    let user = {username:null, name: null}
    if (loggedUserJSON) {
       user = JSON.parse(loggedUserJSON)
       blogsService.setToken(user.token)
    }
    dispatch({
      type: 'INIT_LOGIN',
      data: {username: user.username, name: user.name}
    })
  }
}

export const logout = () => {
  return async dispatch => {
    localStorage.removeItem(userLocalStorageKey)
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({username, password})
    localStorage.setItem(userLocalStorageKey, JSON.stringify(user))
    blogsService.setToken(user.token)
    dispatch({
      type: 'LOGIN', 
      data: {username: user.username, name: user.name}
    })
  }
}

export default reducer