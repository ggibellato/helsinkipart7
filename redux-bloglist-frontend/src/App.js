import React, { useEffect }  from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'
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
  let iBlog = props.initializeBlogs;
  useEffect(() => {
    iBlog()
  },[iBlog])

  let iLogin = props.initializeLogin;
  useEffect(() => {
    iLogin()
  },[iLogin])

  let iUser = props.initializeUsers;
  useEffect(() => {
    iUser()
  },[iUser])

  let username = props.login.name;

  const handleLogout = (event) => {
    event.preventDefault()
    props.logout();
  }

  return (
    <div className="container">
      <Notification />
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {username
                  ? <p>{username} logged in <Button onClick={handleLogout}>logout</Button></p>
                  : <Link to="/users">users</Link>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" render={() => username === null ? <Login /> : <Blogs />} />
        <Route exact path="/blogs/:id" render={({ match }) => username === null ? <Login /> : <Blog blogId={match.params.id} />} />
        <Route exact path="/users" render={() => username === null ? <Login /> : <Users />} />
        <Route exact path="/users/:id" render={({ match }) => username === null ? <Login /> : <User userId={match.params.id} />} />
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
