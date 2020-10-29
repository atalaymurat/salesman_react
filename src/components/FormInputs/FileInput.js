import React from 'react'

const FileInput = props => {
  const { mime, label, input, type } = props
  return (
    <div className="custom-file">
      <input 
        className="custom-file-input"
        name={input.name} 
        type={type} 
        accept={mime} 
        onChange={event => handleChange(event, input)} 
        multiple
        lang="tr"
        id="customFile"
        />
      <label className="custom-file-label" htmlFor="customFile">{label}</label>
    </div>
  )
}

const handleChange = (event, input) => {
  event.preventDefault()
  let imageFiles = event.target.files
  if (imageFiles) {
    //const localImageUrl = URL.createObjectURL(imageFile)
    //const imageObject = new window.Image()

    //imageObject.onload = () => {
      //imageFile.width = imageObject.naturalWidth
      //imageFile.height = imageObject.naturalHeight
      input.onChange(imageFiles)
      //URL.revokeObjectURL(imageFile)
    //}
    //imageObject.src = localImageUrl
  }
}

export default FileInput
