import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { removeBlog } from '../reducers/blogReducer'
import { setNotification, nERROR } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

function Blogs(props) {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleRemovedClick = (event, blogId, title, author) => {
    event.preventDefault()
    if(window.confirm(`remove blog ${title} by ${author}`)) {
      props.removeBlog(blogId)
        .catch(reason => {
          props.setNotification(reason.message, nERROR, 5)
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      {props.blogs.sort((b1, b2) => b2.likes - b1.likes)
        .map(blog => 
          <div style={blogStyle} key={blog.id}>
            <Link to ={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
            {/* 
                <button style={{ display: props.user.username === blog.user.username ? '' : 'none' }} 
                  onClick={(event) => handleRemovedClick(event, blog.id, blog.title, blog.author)}>remove</button>
            */}
          </div>
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login
  }
}

const mapDispatchToProps = {
  removeBlog, setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs)