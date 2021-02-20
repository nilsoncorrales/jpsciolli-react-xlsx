import { useState } from "react";
import { convertSheetToJson, readFileExcel } from "./service/sheet";
import "./App.css";

const App = () => {
  const [file, changeFile] = useState({ data: [] });

  const acceptFile = `.xlsx,.csv`;

  const handleClick = () => {
    console.log("handleClick");
  };

  const handleChange = (event) => {
    // console.log("handleChange ", event);

    const reader = readFileExcel(event);
    reader.addEventListener("loadend", async (e) => {
      const data = await convertSheetToJson(e);
      console.log("readFile ", data);
      changeFile({ data });
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>

      <input
        type="file"
        name="file"
        accept={acceptFile}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Read file</button>
      <br />

      {file && (
        <div>
          <h3>Data</h3>
          {file.data.map((sheet) =>
            sheet.map(({ id, page, titular, link }) => (
              <div key={id}>
                <p>{titular}</p>
                <p>Pagina: {page}</p>
                <a href={link}>{link}</a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default App;
