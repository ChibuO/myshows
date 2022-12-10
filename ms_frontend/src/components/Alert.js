import React from 'react'

const Alert = ({alert}) => {
  return (
    <div className={`alert-box ${alert && alert.clear !== true ? 'alert-box-show' : ''}`}>
        <p>{alert ? alert.message : "null"}</p>
    </div>
  )
}

export default Alert