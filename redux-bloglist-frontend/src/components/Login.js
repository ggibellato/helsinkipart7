import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/loginReducer'
import { setNotification, nERROR} from '../reducers/notificationReducer'
import { Form, Button } from 'react-bootstrap'

const Login = (props) => {

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username.value, password.value)
      .catch(reason => {
        props.setNotification('Wrong credentials', nERROR, 5)
      })
  }

  return(
    <div>
      <h1>log in to application</h1>
      <Form onSubmit={handleLogin} className='loginForm'>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" name="Username" {...username.input}/>
          <Form.Label>password</Form.Label>
          <Form.Control type="password" name="Password" {...password.input}/>
          <Button type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default connect(null, { login, setNotification })(Login)