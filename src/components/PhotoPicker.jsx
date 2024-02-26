import React from 'react'
import ReactDOM from 'react-dom'
const PhotoPicker = ({onChange}) => {
  const picker = (
    <input type="file"  accept="" id="photo-picker" onChange={onChange} />
  )
  
    return ReactDOM.createPortal(
        picker,
        document.getElementById('photo-picker-element')   
    )
}

export default PhotoPicker