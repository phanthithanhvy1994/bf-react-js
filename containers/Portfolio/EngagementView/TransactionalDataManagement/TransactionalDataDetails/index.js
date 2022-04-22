import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { unwrapResult } from '@reduxjs/toolkit'
import { AutoSizer, MultiGrid, InfiniteLoader, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

import { getCultureInfo } from 'src/containers/Setting/Redux'

import { Header, Popup, Icon } from 'src/components'
import { openErrorModal } from 'src/containers/common/actions'
import { REQUEST_MODEL } from 'src/config/constants'

import { TransactionalDataDetailsConfig } from './gridConfig'
import { TransactionalDataDetailsMessages } from './constants'
import { getTransactionalDataDetails } from '../services'
import { getTransactionalDataFiles } from 'src/containers/Portfolio/Redux/thunks'
import { showLoading, hideLoading } from 'src/containers/Common/actions'
import TransactionalDataDetailsModel from './transactionalDataDetails.model'
import { TransactionDataFileStatus } from '../constants'
import { Enums } from './enum'
import '../styles.scss'

const TransactionalDataDetails = (props) => {
  const dispatch = useDispatch()

  const { transactionalDataFiles } = useSelector((state) => state.engagement)
  const { currentUser } = useSelector((state) => state.account)

  const [rowCount, setRowCount] = useState(0)
  const [dataTable, setDataTable] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [islimitedData, setIslimitedData] = useState(false)
  const [isDisableLeftScroll, setIsDisableLeftScroll] = useState(true)
  const [isDisableRightScroll, setIsDisableRightScroll] = useState(false)

  const contentBoxRef = useRef(null)
  const multiGridRef = useRef(null)
  const scrollToLeftRef = useRef(null)
  const scrollToRightRef = useRef(null)

  const { geoCode, containerCode, engagementId } = useParams()

  const { localize } = window
  let transactionalDataFileId = null
  let transactionalDataFileName = null
  if (transactionalDataFiles && transactionalDataFiles.length > 0) {
    const fileCheckSuccess = _.find(transactionalDataFiles, ['status', TransactionDataFileStatus.fileCheckSuccess])
    if (fileCheckSuccess) {
      transactionalDataFileId = fileCheckSuccess.transactionalDataFileId
      transactionalDataFileName = fileCheckSuccess.fileName
    }
  }

  const headerSettings = TransactionalDataDetailsConfig.columns
  let cellMeasurerCache = new CellMeasurerCache({
    fixedWidth: true,
    fixedHeight: false,
    defaultHeight: Enums.rowHeight,
    minHeight: Enums.rowHeight
  })
  let infiniteLoaderRowRendered = null

  useEffect(() => {
    getLocalizeCultureInfo()
    setRowCount(1)
    loadMoreRows({ startIndex: 0, stopIndex: Enums.minBatchSize })

    // componentWillUnmount
    return () => {
      cellMeasurerCache = null
    }
  }, [])

  const getLocalizeCultureInfo = async () => {
    const model = {
      ...REQUEST_MODEL,
      query: { locale: currentUser && currentUser.locale },
      geoCode
    }
    const { result } = unwrapResult(await dispatch(getCultureInfo(model)))
    window.localize.addCultureInfo(_.get(result, 'data', null))
  }

  const cellRenderer = (cellProps) => {
    if (cellProps.rowIndex === 0) {
      return renderHeader(cellProps)
    }

    return renderBody(cellProps)
  }

  const renderColWidth = ({ index }) => {
    const colIndex = index >= Enums.numFreezeColumn ? Enums.numFreezeColumn : index
    const header = headerSettings[colIndex]
    if (header) {
      return header.width || 0
    }

    return null
  }

  const getColumnHeader = (columnIndex) => {
    let header = headerSettings[columnIndex]
    const isRightPane = columnIndex >= Enums.numFreezeColumn
    if (isRightPane) {
      header = headerSettings[Enums.numFreezeColumn]
    }
    return header
  }

  const renderHeader = ({ key, rowIndex, columnIndex, parent, style }) => {
    const isRightPane = columnIndex >= Enums.numFreezeColumn
    const columnHeader = getColumnHeader(columnIndex)
    const columnWidth = renderColWidth({ index: columnIndex })
    const cellStyle = { ...style, width: `${columnWidth}px` }
    const translatedText = _.find(TransactionalDataDetailsMessages, x => x.id === columnHeader.code)
    const headerText = translatedText && translatedText.value
    const headerEntryInformationNum = columnIndex >= Enums.numFreezeColumn && columnHeader.code !== Enums.colNameEnum.allJournalEntryInformation ? `${columnIndex - Enums.numFreezeColumn + 1}` : ''

    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        <div style={cellStyle}>
          <div className={`header-cell ${isRightPane ? 'right-header' : 'left-header'}`}>
            {headerText}{headerEntryInformationNum}
          </div>
        </div>
      </CellMeasurer>
    )
  }

  const renderBody = ({ key, rowIndex, columnIndex, parent, style }) => {
    const { locale } = currentUser && currentUser.user
    const columnHeader = getColumnHeader(columnIndex)
    const columnWidth = renderColWidth({ index: columnIndex })
    const cellStyle = { ...style, width: `${columnWidth}px`, borderBottom: '1px solid #eee' }
    const rowDataIndex = rowIndex - 1
    let cellDisplayText
    let content

    if (rowIndex <= rowCount - 1) {
      const rowData = dataTable[rowDataIndex]
      if (rowData) {
        let colDataItem = _.find(rowData.dataItem, x => x.fieldName === columnHeader.code)
        if (columnHeader.code === Enums.colNameEnum.journalEntryInformation && columnIndex > Enums.numFreezeColumn) {
          colDataItem = _.find(rowData.dataItem, x => x.fieldName === columnHeader.code && x.infoColIndex === (columnIndex - Enums.numFreezeColumn))
        }

        if (colDataItem) {
          cellDisplayText = colDataItem.value
          if (columnIndex === 0) {
            cellDisplayText = localize.formatInputDate(colDataItem.value, locale)
          } else if (columnIndex === 1) {
            cellDisplayText = localize.toLocalNumberString(colDataItem.value, locale)
          }
        }
      }
      if (columnIndex >= 2) {
        const widthText = TransactionalDataDetailsModel.measureWidthText(cellDisplayText)
        if (widthText && widthText > ((columnWidth * 3))) {
          content = (
            <div style={cellStyle}>
              <div className='row-cell truncate-cell'>
                <Popup
                  className='tooltip-name'
                  trigger={<span>{cellDisplayText}</span>}
                  content={cellDisplayText}
                  on='hover'
                  basic
                  hoverable
                ></Popup>
              </div>
            </div>
          )
        }
        else {
          content = (
            <div style={cellStyle}>
              <div className={`row-cell`}>
                {cellDisplayText}
              </div>
            </div>
          )
        }
      } else {
        content = (
          <div style={cellStyle}>
            <div className={`row-cell ${columnIndex === 0 ? 'date-cell' : ''} ${columnIndex === 1 ? 'amount-cell' : ''}`}>
              {cellDisplayText}
            </div>
          </div>
        )
      }
    } else {
      content = <div style={style} />
    }

    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={columnIndex}
        rowIndex={rowIndex}
      >
        {content}
      </CellMeasurer>
    )
  }

  const isRowLoaded = ({ index }) => index < rowCount - 1

  const loadMoreRows = async ({ startIndex, stopIndex }) => {
    if (!isLoading && !islimitedData && stopIndex >= Enums.minBatchSize) {
      let fileId = transactionalDataFileId
      if (!fileId) {
        const fileRequest = {
          uri: { engagementId, containerCode },
          geoCode: geoCode
        }
        const resultFile = unwrapResult(await dispatch(getTransactionalDataFiles(fileRequest)))
        if (resultFile.result && resultFile.result.data && resultFile.result.data.length > 0) {
          const dataFiles = resultFile.result.data[0]
          fileId = dataFiles.transactionalDataFileId
          transactionalDataFileName = dataFiles.fileName
        }
      }

      if (fileId) {
        props.setInsertFileName(transactionalDataFileName)
        setIsLoading(true)
        dispatch(showLoading())
        const model = {
          ...REQUEST_MODEL,
          uri: { engagementId, containerCode },
          query: {
            transactionalDataFileId: fileId,
            startIndex,
            stopIndex
          },
          geoCode
        }

        const resultAction = await getTransactionalDataDetails(model)
        const { error, result } = resultAction
        if (error || !result) {
          dispatch(openErrorModal({
            content: TransactionalDataDetailsMessages.error,
          }))
        }
        const dataModel = TransactionalDataDetailsModel.buildObject(result.data)
        const unionDataTable = _.union(dataTable, dataModel)
        if (!dataModel || dataModel.length === 0) {
          setIslimitedData(true)
        }
        setIsLoading(false)
        dispatch(hideLoading())
        setRowCount(unionDataTable.length + 1)
        setDataTable(unionDataTable)
      } else {
        props.setIsViewData(false)
      }
    }
  }

  const onSectionRendered = ({ rowStartIndex, rowStopIndex }) => {
    infiniteLoaderRowRendered({
      startIndex: rowStartIndex,
      stopIndex: rowStopIndex
    })
  }

  const setStatusButtonScroll = (isAllowScrollToLeft, isAllowScrollToRight) => {
    setIsDisableLeftScroll(!isAllowScrollToLeft)
    setIsDisableRightScroll(!isAllowScrollToRight)
  }

  const onScroll = () => {
    const gridRef = multiGridRef.current
    let gridRefState = {}
    if (gridRef && gridRef.state) {
      gridRefState = gridRef.state
    }
    const currentGridScrollLeft = Math.ceil(gridRefState.scrollLeft)
    let scrollingContainer = {}
    if (gridRef && gridRef._topRightGrid) {
      scrollingContainer = gridRef._topRightGrid._scrollingContainer
    }
    const maxScrollLeft = scrollingContainer.scrollWidth - scrollingContainer.clientWidth - Enums.borderGap
    if (currentGridScrollLeft === 0) {
      setStatusButtonScroll(false, true)
    } else if (currentGridScrollLeft >= maxScrollLeft) {
      setStatusButtonScroll(true, false)
    } else {
      setStatusButtonScroll(true, true)
    }
  }

  const handleScrollToLeftClick = () => {
    const gridRef = multiGridRef.current
    let gridRefState = {}
    if (gridRef && gridRef.state) {
      gridRefState = gridRef.state
    }
    const currentGridScrollLeft = Math.ceil(gridRefState.scrollLeft)
    let scrollingContainer = {}
    if (gridRef && gridRef._topRightGrid) {
      scrollingContainer = gridRef._topRightGrid._scrollingContainer
    }

    if (currentGridScrollLeft === 0) {
      return
    }

    let nextWidth = 0
    for (let index = 0; index < Enums.columnCount; index++) {
      const columnHeader = getColumnHeader(index)
      const headerWidth = columnHeader.width

      if (index > 0 && nextWidth === currentGridScrollLeft) {
        nextWidth = nextWidth - headerWidth
        break
      }

      if (nextWidth + headerWidth > currentGridScrollLeft) {
        break
      }

      nextWidth = nextWidth + headerWidth
    }

    nextWidth = nextWidth < 0 ? 0 : nextWidth
    if (scrollingContainer) {
      scrollingContainer.scrollLeft = nextWidth
    }
    if (gridRef) {
      gridRef.setState({ scrollLeft: nextWidth < 0 ? 0 : nextWidth })
    }
  }

  const handleScrollToRightClick = () => {
    const gridRef = multiGridRef.current
    let gridRefState = {}
    if (gridRef) {
      gridRefState = gridRef.state
    }
    const currentGridScrollLeft = Math.ceil(gridRefState.scrollLeft)
    let scrollingContainer = {}
    if (gridRef && gridRef._topRightGrid) {
      scrollingContainer = gridRef._topRightGrid._scrollingContainer
    }
    const maxScrollLeft = scrollingContainer.scrollWidth - scrollingContainer.clientWidth
    const columnEntryInfo = getColumnHeader(Enums.numFreezeColumn)

    if (currentGridScrollLeft === maxScrollLeft - columnEntryInfo.width - Enums.borderGap) {
      const scrollToRight = scrollToRightRef.current
      if (scrollToRight && scrollToRight.props && scrollToRight.props.disabled) return
      return
    }

    let nextWidth = 0
    for (let index = 0; index < Enums.columnCount; index++) {
      const columnHeader = getColumnHeader(index)
      const headerWidth = columnHeader.width
      nextWidth = nextWidth + headerWidth

      if (nextWidth > currentGridScrollLeft) {
        break
      }
    }

    nextWidth = nextWidth > maxScrollLeft ? maxScrollLeft : nextWidth
    scrollingContainer.scrollLeft = nextWidth
    gridRef.setState({ scrollLeft: nextWidth < 0 ? 0 : nextWidth })
  }

  return (
    <div ref={contentBoxRef} className='upload-transactional__contentbox'>
      <Header as='h2'>{TransactionalDataDetailsMessages.detailHeader}</Header>
      <div className='scroll-to'>
        <Icon
          ref={scrollToLeftRef}
          name='chevron left'
          disabled={isDisableLeftScroll}
          onClick={handleScrollToLeftClick}
        />
        <Icon ref={scrollToRightRef} name='chevron right' disabled={isDisableRightScroll} onClick={handleScrollToRightClick} />
      </div>
      <div className='upload-transactional__contentbox__viewupload'>
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={rowCount}
        >
          {({ onRowsRendered }) => {
            infiniteLoaderRowRendered = onRowsRendered
            return (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <MultiGrid
                    ref={multiGridRef}
                    fixedColumnCount={Enums.fixedColumnCount}
                    fixedRowCount={Enums.numFreezeRow}
                    scrollToColumn={Enums.numFreezeColumn}
                    scrollToRow={0}
                    onScroll={onScroll}
                    cellRenderer={cellRenderer}
                    onSectionRendered={onSectionRendered}
                    columnWidth={renderColWidth}
                    columnCount={Enums.columnCount}
                    enableFixedColumnScroll
                    enableFixedRowScroll
                    height={Enums.gridHeight}
                    rowHeight={cellMeasurerCache.rowHeight}
                    rowCount={rowCount}
                    width={width}
                    classNameBottomLeftGrid='bottom-left-grid disable-will-change'
                    classNameBottomRightGrid='bottom-right-grid disable-will-change'
                    classNameTopLeftGrid='top-left-grid'
                    classNameTopRightGrid='top-right-grid'
                    hideTopRightGridScrollbar
                    hideBottomLeftGridScrollbar
                  />
                )}
              </AutoSizer>
            )
          }}
        </InfiniteLoader>
      </div>      
    </div>
  )
}

export default withRouter(TransactionalDataDetails)