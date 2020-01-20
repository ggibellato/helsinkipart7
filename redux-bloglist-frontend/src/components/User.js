import React from 'react'
import { connect } from 'react-redux'

function User(props) {
  if(!props.user){
    return null
  }
  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {props.user.blogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>
            )}
      </ul>
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