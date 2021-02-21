import { useState } from "react"
import "./App.css"
import { Button, Heading, List } from "./components"

import { convertSheetToJson, readFileExcel } from "./service"

const App = () => {
  const [file, changeFile] = useState({ data: [] })

  const acceptFile = `.xlsx`

  const handleClick = () => {
    // console.log("handleClick", e)
    const inputFile = document.querySelector("#inputFile")
    inputFile.click()
    inputFile.onChange = () => {
      handleChange()
    }
  }

  const handleChange = (event) => {
    // console.log("handleChange ", event)
    if (!event) {
      return
    }

    const reader = readFileExcel(event)
    if (!reader) {
      return
    }

    reader.addEventListener("loadend", async (e) => {
      if (!e) {
        return
      }
      console.log("handleChange ", e)
      const data = await convertSheetToJson(e)
      // console.log("readFile ", data)
      changeFile({ data })
    })
  }

  return (
    <div className="App">
      <Heading title="Subida de archivos" subtitle="Extensión válida: .xlsx" />
      <input
        id="inputFile"
        style={{ display: "none" }}
        type="file"
        name="file"
        accept={acceptFile}
        onChange={handleChange}
      />
      <Button type="primary" onClick={handleClick} text="Leer archivo" />
      <br />

      {file && <List data={file.data} />}
    </div>
  )
}

export default App
