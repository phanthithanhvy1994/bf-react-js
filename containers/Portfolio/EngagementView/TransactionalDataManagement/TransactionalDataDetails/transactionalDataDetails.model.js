import { Enums } from './enum'

const TransactionalDataDetailsModel = {
  buildObject (result) {
    let dataTable = []
    if (result && result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let rowData = {}
        rowData.id = result[i].id
        this.buildDataItem(rowData, result[i])
        dataTable.push(rowData)
      }
    }
    return dataTable
  },
  buildCellData (fieldName, value, infoColIndex = null) {
    return {
      fieldName: fieldName,
      value: value,
      infoColIndex: infoColIndex
    }
  },
  measureWidthText (text, font = null) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = font || getComputedStyle(document.body).font
    return context.measureText(text).width
  },
  buildDataItem (rowData, result) {
    rowData.dataItem = [
        this.buildCellData(Enums.colNameEnum.postingDate, result.postingDate),
        this.buildCellData(Enums.colNameEnum.journalEntryAmount, result.journalEntryAmount),
        this.buildCellData(Enums.colNameEnum.journalEntryDescription, result.journalEntryDescription),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation01, 0),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation02, 1),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation03, 2),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation04, 3),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation05, 4),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation06, 5),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation07, 6),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation08, 7),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation09, 8),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation10, 9),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation11, 10),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation12, 11),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation13, 12),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation14, 13),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation15, 14),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation16, 15),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation17, 16),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation18, 17),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation19, 18),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation20, 19),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation21, 20),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation22, 21),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation23, 22),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation24, 23),
        this.buildCellData(Enums.colNameEnum.journalEntryInformation, result.journalEntryInformation25, 24)
    ]
  }
}

export default TransactionalDataDetailsModel
