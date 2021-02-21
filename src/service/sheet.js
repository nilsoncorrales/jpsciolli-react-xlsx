import * as ExcelJS from "exceljs"

// let FILE = ""
let IS_TYPE_XLSX = ""

const getTypeFile = (extension) => {
  return extension.includes(".xlsx")
}

const readFileExcel = (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }

  IS_TYPE_XLSX = getTypeFile(file.type)

  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  return reader
}

const convertSheetToJson = async (e) => {
  const { result } = e.target

  const workbook = new ExcelJS.Workbook()

  if (!IS_TYPE_XLSX) {
    return
  }
  await workbook.xlsx.load(result)

  let worksheets = []

  workbook.eachSheet((worksheet) => {
    let urls = []
    const { name } = worksheet

    worksheet.eachRow((row, index) => {
      // console.info("row ", row, row.cellCount, index)
      if (index === 1) {
        return
      }
      const link = getValue(row.getCell(8))
      urls = [...urls, link]
    })
    worksheets = [...worksheets, { name, urls }]
  })
  // console.info("worksheets ", worksheets)

  return worksheets
}

const getValue = (cell) => {
  return cell.value?.hyperlink || cell.value || ""
}

export { readFileExcel, convertSheetToJson }
