import React from "react"
import PropTypes from "prop-types"

import "./DragDrop.css"

const DragDrop = ({ handleFile }) => {
  const handleSuppress = (evt) => {
    console.log("suppress", evt)
    evt.stopPropagation()
    evt.preventDefault()
  }
  const handleDrop = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    console.log("onDrop", evt)
    const files = evt.dataTransfer.files
    console.log("onDrop:files", files)
    if (files && files[0]) handleFile(files[0])
  }

  return (
    <div
      className="DragDropFile"
      onDrop={handleDrop}
      onDragEnter={handleSuppress}
      onDragOver={handleSuppress}
    >
      Arrastra un archivo aqui
    </div>
  )
}

DragDrop.propTypes = {
  handleFile: PropTypes.func.isRequired,
}

export default DragDrop
