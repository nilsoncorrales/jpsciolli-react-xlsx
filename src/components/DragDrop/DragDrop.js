import React from "react"
import PropTypes from "prop-types"

import "./DragDrop.css"

const DragDrop = ({ data, dispatch, handleFile }) => {
  const handleDragEnter = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 })
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 })
    if (data.dropDepth > 0) return
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })
  }

  const handleDragOver = (e) => {
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true })
  }
  const getTypeFile = (extension) => {
    return extension.includes(".xlsx")
  }

  const handleDrop = (e) => {
    e.stopPropagation()
    e.preventDefault()
    // console.log("onDrop", e)
    // const files = e.dataTransfer.files
    // if (files && files[0]) handleFile(files[0])

    getTypeFile

    let files = [...e.dataTransfer.files]
    // console.log("handleDrop:files ", files)

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name)
      files = files
        .filter((f) => !existingFiles.includes(f.name))
        .filter((f) => getTypeFile(f.name))
      // console.log("handleDrop:files2 ", files)

      files.map((f) => {
        handleFile(f)
      })

      dispatch({ type: "ADD_FILE_TO_LIST", files })
      e.dataTransfer.clearData()
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 })
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })
    }
  }

  return (
    <div
      className="DragDropFile"
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      Arrastra un archivo aqui
    </div>
  )
}

DragDrop.propTypes = {
  data: PropTypes.any,
  dispatch: PropTypes.func.isRequired,
  handleFile: PropTypes.func.isRequired,
}

export default DragDrop
