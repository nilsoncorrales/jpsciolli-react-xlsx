import * as ExcelJS from "exceljs"

const readFileExcel = (event) => {
  const file = event.target.files[0]
  if (!file) {
    return
  }
  const reader = new FileReader()
  reader.readAsArrayBuffer(file)
  return reader
}

const convertSheetToJson = async (e) => {
  const { result } = e.target

  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(result)

  let worksheets = []

  workbook.eachSheet((worksheet) => {
    let rows = []
    // console.info("worksheet ", worksheet, worksheet.rowCount);
    worksheet.eachRow((row, index) => {
      console.info("row ", row, row.cellCount, index)
      if (index === 1) {
        return
      }
      const content = {
        id: getValue(row.getCell(1)),
        medio: getValue(row.getCell(2)),
        date: getValue(row.getCell(3)),
        nombre: getValue(row.getCell(4)),
        section: getValue(row.getCell(5)),
        page: getValue(row.getCell(6)),
        titular: getValue(row.getCell(7)),
        link: getValue(row.getCell(8)),
      }
      rows = [...rows, content]
    })
    worksheets = [...worksheets, rows]
  })
  console.info("worksheets ", worksheets)

  return worksheets
}

const getValue = (cell) => {
  return cell.value?.hyperlink || cell.value || ""
}

export { readFileExcel, convertSheetToJson }
