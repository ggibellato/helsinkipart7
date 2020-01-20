import React, { useEffect }  from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLogin } from './reducers/loginReducer'
import { logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'


function App(props) {
  useEffect(() => {
    props.initializeBlogs()
  },[])

  useEffect(() => {
    props.initializeLogin()
  },[])

  useEffect(() => {
    props.initializeUsers()
  },[])

  let username = props.login.username;

  const handleLogout = (event) => {
    event.preventDefault()
    props.logout();
  }

  return (
    <div>
      <Notification />
      <Router>
        <div>
          <div>
            <Link to="/">home</Link>
            <Link to="/users">users</Link>
            {username !== null ? <p>{username} logged in <button onClick={handleLogout}>logout</button></p>: null }
          </div>
          <Route exact path="/" render={() => username === null ? <Login /> : <Blogs />} />
          <Route exact path="/blogs/:id" render={({ match }) => username === null ? <Login /> : <Blog blogId={match.params.id} />} />
          <Route exact path="/users" render={() => username === null ? <Login /> : <Users />} />
          <Route exact path="/users/:id" render={({ match }) => username === null ? <Login /> : <User userId={match.params.id} />} />
        </div>
      </Router>
    </div>    
  )
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

export default connect(mapStateToProps, { logout, initializeBlogs, initializeLogin, initializeUsers })(App)
