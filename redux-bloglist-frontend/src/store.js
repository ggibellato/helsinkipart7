import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  notification: notificationReducer,
  users: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store

// done 7.4 7.5 7.6 7.7 7.8 7.9 7.10 7.11 7.12 7.13 7.14 7.15 -- 

