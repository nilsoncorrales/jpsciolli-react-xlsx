import { useState } from "react"
// import axios from "axios"

import "./App.css"

import { Button, DragDrop, Heading, List } from "./components"

import { convertSheetToJson, readFileExcel } from "./service"

const App = () => {
  const [file, changeFile] = useState({ data: [] })

  const acceptFile = `.xlsx`

  const handleClick = () => {
    // console.log("handleClick", e)
    const inputFile = document.querySelector("#inputFile")
    inputFile.click()
    inputFile.onChange = () => handleChange()
  }

  const handleFile = (event) => {
    const reader = readFileExcel(event)
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
      changeFile({ data })

      // const response = axios.post("http://pythonanywhere.com")
      // console.log(response)
    })
  }

  const handleChange = (event) => {
    // console.log("handleChange ", event)
    if (!event) {
      return
    }
    handleFile(event)
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
      <DragDrop handleFile={handleFile} />
      <br />

      {file && <List data={file.data} />}
    </div>
  )
}

export default App
