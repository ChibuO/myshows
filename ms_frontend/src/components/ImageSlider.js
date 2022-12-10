import React from 'react'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

const ImageSlider = ({showImg, onLeftClick, onRightClick, arrows}) => {

    return (
        <div className='image-div'>
            {arrows && <FaArrowAltCircleLeft className='left-arrow' onClick={onLeftClick} />}
            {arrows && <FaArrowAltCircleRight className='right-arrow' onClick={onRightClick} />}
            <img src={showImg} alt="TV Poster" className='image' />
        </div>
    )
}

export default ImageSlider