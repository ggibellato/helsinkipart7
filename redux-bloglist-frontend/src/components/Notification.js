import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if(props.notification.message) {
    return(
      <div className={props.notification.notificationClass}>
        {props.notification.message}
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