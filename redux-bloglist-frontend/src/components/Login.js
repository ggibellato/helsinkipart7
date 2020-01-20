import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { login } from '../reducers/loginReducer'
import { setNotification, nERROR} from '../reducers/notificationReducer'

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
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} className='loginForm'>
        <div>
          username
          <input name="Username" {...username.input}/>
        </div>
        <div>
          password
          <input name="Password"{...password.input}/>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default connect(null, { login, setNotification })(Login)