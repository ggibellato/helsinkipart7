import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { Form, Button, ListGroup } from 'react-bootstrap'
import { addComment } from '../reducers/blogReducer'

const Comment = (props) => {

  const comment = useField('comment')

  const handleAddComment = async (event) => {
    event.preventDefault()
    props.addComment(props.blog.id, comment.value)
    // props.login(username.value, password.value)
    //   .catch(reason => {
    //     props.setNotification('Wrong credentials', nERROR, 5)
    //   })
  }

  return(
    <div>
      <Form onSubmit={handleAddComment}>
        <Form.Group>
          <Form.Control type="text" name="Comment" {...comment.input}/>
          <Button type="submit">add comment</Button>
        </Form.Group>
      </Form>
      <ListGroup>
        {props.blog.comments.map((comment, idx) =>
              <ListGroup.Item key={idx}>
                {comment}
              </ListGroup.Item>
            )}
      </ListGroup>            
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


export default connect(mapStateToProps, {addComment} )(Comment)