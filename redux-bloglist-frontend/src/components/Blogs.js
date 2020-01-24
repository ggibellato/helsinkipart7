import React from 'react'
import { connect } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

function Blogs(props) {
  return (
    <div>
      <h1>blogs</h1>
      <Togglable buttonLabel='new blog'>
        <BlogForm />
      </Togglable>
      <Table striped>
        <tbody>
          {props.blogs.sort((b1, b2) => b2.likes - b1.likes)
            .map(blog => 
              <tr key={blog.id}>
                <td>
                  <Link to ={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </td>
              </tr>
            )}
        </tbody>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.login
  }
}

export default connect(mapStateToProps, null)(Blogs)