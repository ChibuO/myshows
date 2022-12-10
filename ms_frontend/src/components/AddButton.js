import React from 'react'

const AddButton = ({btnRef, classname, name, onclick}) => {
  return (
    <button ref={btnRef} className={`${classname} floating-button button`}
    onClick={onclick}>{name}</button>
  )
}

export default AddButton