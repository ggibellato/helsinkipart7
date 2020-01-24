import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = (props) => {
  if(props.notification.message) {
    return(
      <div>
        {(props.notification.message && <Alert variant={props.notification.notificationClass}>{props.notification.message}</Alert>)}      
      </div>
    )
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

export default connect(mapStateToProps)(Notification)