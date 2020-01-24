import React  from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { newBlog } from '../reducers/blogReducer'
import { setNotification, nERROR } from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const submitCreate = (event) => {
    event.preventDefault()
    props.newBlog(title.value, author.value, url.value)
      .catch(reason => {
        props.setNotification(reason.message, nERROR, 5)
      })
  }

  return(
    <div>
      <h2>create new</h2>
      <Form onSubmit={submitCreate}>
        <Form.Group>
          <Form.Label>title</Form.Label>
          <Form.Control type="text" name="title"{...title.input}/>
          <Form.Label>author</Form.Label>
          <Form.Control type="text" name="author" {...author.input}/>
          <Form.Label>url</Form.Label>
          <Form.Control type="url" name="url" {...url.input}/>
          <Button type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  newBlog, setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)
