import React from 'react'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

function User(props) {
  if(!props.user){
    return null
  }
  return (
    <div>
      <h1>{props.user.name}</h1>
      <h2>added blogs</h2>
      <ListGroup >
        {props.user.blogs.map(blog =>
              <ListGroup.Item key={blog.id}>
                {blog.title}
              </ListGroup.Item>
            )}
      </ListGroup >
    </div>
  )
}

const getUser = (state, userId) => {
  let user = state.users.filter( u => u.id === userId);
  if(user !== null) {
    user = user[0];
  }
  return user
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: getUser(state, ownProps.userId)
  }
}

export default connect(mapStateToProps, null)(User)