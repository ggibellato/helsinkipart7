import React from 'react'
import { connect } from 'react-redux'
import { addLikeBlog } from '../reducers/blogReducer'
import { setNotification, nERROR, nOK } from '../reducers/notificationReducer'

function Blog(props) {

  if(!props.blog){
    return null
  }

  const handleAddLikeClick = (event) => {
    event.preventDefault()
    props.addLikeBlog(props.blog)
      .then(reason => {
        props.setNotification(`you liked ${props.blog.title}`, nOK, 5)
      })
      .catch(reason => {
        props.setNotification(reason.message, nERROR, 5)
      })
  }

  return (
    <div>
      <h2>{props.blog.title} {props.blog.author}</h2>
      {props.blog.url}<br />
      {props.blog.likes} likes <button onClick={(event) => handleAddLikeClick(event, props.blog.id)}>like</button><br />
      added by {props.blog.user.name}<br />
    </div>
  )
}

const getBlog = (state, blogId) => {
  let blog = state.blogs.filter( u => u.id === blogId);
  if(blog !== null) {
    blog = blog[0];
  }
  return blog
}

const mapStateToProps = (state, ownProps) => {
  return {
    blog: getBlog(state, ownProps.blogId)
  }
}

export default connect(mapStateToProps, {addLikeBlog, setNotification} )(Blog)