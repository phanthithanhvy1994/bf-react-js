import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { Checkbox, Radio, OverflowTooltip, Image } from 'src/components'
import rightArrow from 'src/assets/icons/svgs/right_arrow.svg'
import downArrow from 'src/assets/icons/svgs/down_arrow.svg'

import './styles.scss'
import { TIME } from 'src/config/constants'

const SingleTable = (props) => {
  const { headerTable, listData, onClickRow, renderRowData, itemChecked, classes, columnsCollapChild, selectable } = props
  const [ expandedRows, setExpandedRows ] = useState([])
  let localDate
  let localTime
  const renderColumnsDetail = (record, col, colIdx) => {
    const headerCol = headerTable[colIdx] ?? {}
    switch (col.type) {
      case 'radio':
        return (
          <Table.Cell key={`${record.id}-${colIdx}`} className={`${col.className} cbx-clm`} width={headerCol.width}>
            <Radio name='radioGroup'
              value={record.id}
              checked={
                itemChecked.id === record.id && itemChecked.isChecked ? true : false
              }
              onChangeRadio={col.func}
            />
          </Table.Cell>
        )
      case 'checkbox':
        const checkboxProps = { disabled: col.isDisabled, onChange: col.func, value: record.id }
        if (_.has(col, 'checked')) checkboxProps.checked = !!col.checked
        return (
          <Table.Cell key={`${record.id}-${colIdx}`} className={`${col.className} cbx-clm`}  width={headerCol.width}>
            <Checkbox {...checkboxProps}/>
          </Table.Cell>
        )
      case 'date':
        localDate = window.localize.toLocalDate(col.value)
        return <Table.Cell key={`${record.id}-${colIdx}`} className={col.className} width={headerCol.width}>{localDate}</Table.Cell>
      case 'datetime':
        let dateTimeText = ''
        if (col.value) {
          localDate = window.localize.toLocalDate(col.value)
          localTime = window.localize.toLocalDate(col.value, TIME.TIME_NO_SECONDS)
          dateTimeText = `${localDate} | ${localTime}`
        }
        return (
          <Table.Cell key={`${record.id}-${colIdx}`} className={col.className} width={headerCol.width}>
            {dateTimeText}
          </Table.Cell>
        )
      case 'datetimeByLocale':
        let datetimeByLocaleText = ''
        if (col.value) {
          localDate = window.localize.toLocaleDate(col.value)
          localTime = window.localize.toLocaleDate(col.value, TIME.DEFAULT_TIME)
          datetimeByLocaleText = `${localDate} | ${localTime}`
        }
        return (
          <Table.Cell key={`${record.id}-${colIdx}`} className={col.className} width={headerCol.width}>
            {datetimeByLocaleText}
          </Table.Cell>
        )
      case 'popup':
        return (
          <Table.Cell key={`${record.id}-${colIdx}`} className={col.className} width={headerCol.width}>
            <OverflowTooltip
              content={col.value}
            />
          </Table.Cell>
        )
      case 'collap':
        return (
          <Table.Cell key={`${record.id}-${colIdx}`} className={col.className} width={headerCol.width}>
            {renderItemChevron(record)}
          </Table.Cell>
        )
      default:
        return <Table.Cell key={`${record.id}-${colIdx}`} className={col.className} width={headerCol.width}>{col.value}</Table.Cell>
    }
  }

  const renderItemChevron = (record) => {
    const currentExpandedRows = expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(record.id)
    const handleCallBack = () => onClickChevron(record.id)
    const recordLength = _.get(record, 'childRequests.length', 0)
    if (recordLength > 0) {
      if (isRowCurrentlyExpanded) {
        return (
          <Image src={downArrow} className='chevron down' onClick={handleCallBack} />
        )
      }
      else {
        return (
          <Image src={rightArrow} className='chevron right' onClick={handleCallBack}/>
        )
      }
    }
  }

  const onClickChevron = (recordId) => {
    const currentExpandedRows = expandedRows
    const isRowCurrentlyExpanded = currentExpandedRows.includes(recordId)
    const newExpandedRows = isRowCurrentlyExpanded
      ? currentExpandedRows.filter((id) => id !== recordId)
      : currentExpandedRows.concat(recordId)
    setExpandedRows(newExpandedRows)
  }

  const renderItem = (record) => {
    const itemRows = [
      <Table.Row key={record.id} onClick={(e) => onClickRow && onClickRow(e, record.id, record.geoCode, record.containerCode)}>
        {
          renderRowData(record).map((col, colIdx) => renderColumnsDetail(record, col, colIdx))
        }
      </Table.Row>
    ]
    const recordLength = _.get(record, 'childRequests.length', 0)
    const childrenRow = []
    if (expandedRows.includes(record.id) && recordLength > 0) {
      const dataExpandedRows = record?.childRequests
      dataExpandedRows.forEach((row, childRowIdx) => {
        childrenRow.push(
          <Table.Row key={`row-expanded-${record.id}-${childRowIdx}`}>
            {columnsCollapChild(row).map((col, colIdx) => (<Table.Cell className={`row-expanded ${col.className}`} key={colIdx}>{col.value}</Table.Cell>))}
          </Table.Row>
        )
      })
      itemRows.push(
        <Table.Row key={`row-expanded-${record.id}`} className='tr-row__expanded'>
          <Table.Cell className='group-td__collap'>
            <div className='group-row__collap'>
              {childrenRow}
            </div>
          </Table.Cell>
        </Table.Row>
      )
    }
    return itemRows
  }

  let allItemRows = []
  listData.forEach((record) => {
    const perItemRows = renderItem(record)
    allItemRows = [...allItemRows, ...perItemRows]
  })

  return (
    <div className={`${classes} wrapper-table`}>
      <Table selectable={selectable} unstackable>
        <Table.Header>
          <Table.Row>
            {
              headerTable.map((col, idx) => (
                <Table.HeaderCell key={idx} colSpan={col.colSpan} width={col.width} className={col.className}>{col.text}</Table.HeaderCell>
              ))
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allItemRows}
        </Table.Body>
      </Table>
    </div>
  )
}

SingleTable.propTypes = {
  headerTable: PropTypes.array,
  listData: PropTypes.array,
  onClickRow: PropTypes.func,
  renderRowData: PropTypes.func,
  itemChecked: PropTypes.object,
  onClose: PropTypes.func,
  classes: PropTypes.string,
  columnsCollapChild: PropTypes.func,
  selectable: PropTypes.bool,
}

SingleTable.defaultProps = {
  selectable: true,
}

export default SingleTable
