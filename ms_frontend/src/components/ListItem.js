import React, {useContext} from 'react'
import visiblityContext from '../context/visibility/visibility-context'
import {RiEdit2Fill} from 'react-icons/ri'
import {FaRegEye} from 'react-icons/fa'

const ListItem = ({show, bg_color, setGetShow, setSelectedShow}) => {
  //.5 is the desired opacity
  //0 to 255 -> rgb values
  //to string (16) -> convert to hex
  const opacity = Math.floor(.55 * 256).toString(16)
  let styleObj = {
    backgroundColor: bg_color+opacity,
  }
  
  const {setDetailVisible, setFormVisible} = useContext(visiblityContext);
  
  const onEditClick = () => {
    setFormVisible(true)
    setSelectedShow(show)
  }

  const onDoubleClick = () => {
    setDetailVisible(true)
    setSelectedShow(show)
  }

  return (
    <div className='list-item-outer' style={styleObj} onDoubleClick={onDoubleClick}>
      <div className='shows-list-item'>
        <h3>{show.name}</h3>
        <p>{show.platform} {show.completed && <FaRegEye className="completed-dot" />}</p>
        <p>Started: {show.started}</p>
        <RiEdit2Fill className="edit-dot" onClick={onEditClick} />
      </div>
    </div>
  )
}

export default ListItem