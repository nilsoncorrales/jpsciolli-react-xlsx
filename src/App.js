import { useReducer, useState } from "react"
// import axios from "axios"

import "./App.css"

import { Button, DragDrop, Heading, List } from "./components"

import { convertSheetToJson, readFileExcel } from "./service"

const App = () => {
  const [file, changeFile] = useState({ data: [] })
  const acceptFile = `.xlsx`

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth }
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone }
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) }
      default:
        return state
    }
  }
  const [data, dispatch] = useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  })

  const handleClick = () => {
    // console.log("handleClick", e)
    const inputFile = document.querySelector("#inputFile")
    inputFile.click()
    inputFile.onChange = () => handleChange()
  }

  const handleFile = (excel) => {
    // console.log(excel)
    const reader = readFileExcel(excel)
    if (!reader) {
      return
    }
    reader.addEventListener("loadend", async (e) => {
      if (!e) {
        return
      }
      const data = await convertSheetToJson(e)
      // console.log("readFile ", data)
      if (!data) {
        return
      }

      changeFile((prev) => {
        // console.log("prev ", prev)
        return { data: [...prev.data, ...data] }
      })
      // console.log("file ", file)

      // const response = axios.post("http://pythonanywhere.com")
      // console.log(response)
    })
  }

  const handleChange = (event) => {
    // console.log("handleChange ", event)
    if (!event) {
      return
    }
    const file = event.target.files[0]
    handleFile(file)
  }

  return (
    <div className="App">
      <Heading title="Subida de Excel" subtitle="Extensión válida: .xlsx" />
      <input
        id="inputFile"
        style={{ display: "none" }}
        type="file"
        name="file"
        accept={acceptFile}
        onChange={handleChange}
      />
      <Button type="primary" onClick={handleClick} text="Subir archivo" />
      <DragDrop data={data} dispatch={dispatch} handleFile={handleFile} />
      <ol className="dropped-files">
        {data.fileList.map((f) => {
          return <li key={f.name}>{f.name}</li>
        })}
      </ol>
      <br />

      {file && <List data={file.data} />}
    </div>
  )
}

export default App
