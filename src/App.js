import { useReducer, useState } from "react"
import axios from "axios"

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
      console.log("readFile ", data)
      if (!data) {
        return
      }
      // axios.defaults.headers.post["Content-Type"] =
      //   "application/x-www-form-urlencoded"
      // https://scraping-jpsciolli-backend.herokuapp.com/api/news
      // const response = await axios.post("http://127.0.0.1:8000/api/news", { data })

      const instance = axios.create({ timeout: 600000 })
      // instance.defaults.timeout = 56000

      instance
        .post("http://127.0.0.1:8000/api/news", { data: JSON.stringify(data) })
        .then((response) => {
          console.log("handleFile ", response)
        })

      changeFile((prev) => ({ data: [...prev.data, ...data] }))
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
