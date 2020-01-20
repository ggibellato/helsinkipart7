import React  from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { newBlog } from '../reducers/blogReducer'
import { setNotification, nERROR } from '../reducers/notificationReducer'

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
      <form onSubmit={submitCreate}>
        <div>
          title:
          <input
            name="title"
            {...title.input}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            {...author.input}
          />
        </div>
        <div>
          url:
          <input
            name="url"
            {...url.input}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  newBlog, setNotification
}

export default connect(null, mapDispatchToProps)(BlogForm)
