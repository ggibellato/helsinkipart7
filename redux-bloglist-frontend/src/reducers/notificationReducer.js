export const nERROR = 'errorNotification'
export const nOK = 'okNotification'

const reducer = (state = {message:null, notificationClass: nERROR}, action) => {
  switch (action.type) {
    case 'SETMESSAGE':
      return {message:action.data.message, notificationClass: action.data.notificationClass}
    default:
      return state
  }
}

export const setNotification = (message, notificationClass, timeToDisplay) => {
  return async dispatch => {
    dispatch({
      type: 'SETMESSAGE',
      data: { message, notificationClass }
    })
    setTimeout(() => {
      dispatch({
        type: 'SETMESSAGE',
        data: { message: '', notificationClass }
      })
    }, timeToDisplay * 1000)
  }
}

export default reducer