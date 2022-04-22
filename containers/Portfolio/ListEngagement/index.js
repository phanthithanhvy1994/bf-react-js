import React, { useMemo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import { Container, Pagination, Image, SingleTable } from 'src/components'
import illustPortfolioView from 'src/assets/icons/svgs/illustportfolioview.svg'
import { GroupName_URL } from 'src/config/constants'
import { routes } from 'src/config'

import { headerTable, columnsDetail, configPagination } from './constants'

const ListEngagement = (props) => {
  const history = useHistory()
  const { listEngagementsFromStore, portfolioMessages, itemChecked, handleOnChangeRadioItem } = props
  const [ listEngagements, setListEngagements ] = useState([])
  const [ activePage , setActivePage ] = useState(1)

  //UX: in case user create new eng while in page 2,back user into page 1 after successfully create
  useEffect(() => {
    if (listEngagementsFromStore.length > 0) {
      handelOnChangePage(1)
    }
  }, [listEngagementsFromStore.length])
  // in case user del eng keep user still active page
  useEffect(() => {
    setListEngagements(listEngagementsFromStore)
    if (listEngagementsFromStore.length > 0) {
      handelOnChangePage(activePage)
    }
  }, [listEngagementsFromStore])
  //end

  const renderRowData = (record) => {
    return columnsDetail(handleOnChangeRadioItem, record)
  }

  const onClickRow = (e, engegamentId, geoCode, containerCode) => {
    if (e.target.className?.includes('rowClicked') || e.target.closest('td').className?.includes('rowClicked')) {
      history.push(`${routes.portfolio.index}/${geoCode}/${containerCode}/${engegamentId}/${GroupName_URL.GroupName_DATA_AUTHORIZATION}`)
    }
  }

  const handelOnChangePage = (page) => {
    setActivePage(page)
    const fromIndex= (page * configPagination.itemPerPage) - configPagination.itemPerPage
    const toIndex= (page * configPagination.itemPerPage)
    setListEngagements(listEngagementsFromStore.slice(fromIndex, toIndex))
  }

  const renderListOfEngagements = useMemo(() => {
    if (listEngagements.length > 0) {
      return (
        <SingleTable
          headerTable={headerTable}
          listData={listEngagements}
          renderRowData={renderRowData}
          onClickRow={onClickRow}
          itemChecked={itemChecked}
          classes='primary-table'
        />
      )
    } else {
      return (
        <>
          <Image src={illustPortfolioView} alt='illustPortfolioView' centered />
          <div className='div--centered'>{portfolioMessages.emptyEngagement}</div>
        </>
      )
    }
  }, [listEngagements, itemChecked])

  return (
    <Container classes='list-of-engagements__container'>
      <Grid columns='equal'>
        <Grid.Column>
          {renderListOfEngagements}
        </Grid.Column>
      </Grid>
      {
        listEngagementsFromStore?.length > configPagination.itemPerPage && (
          <Pagination
            activePage={activePage}
            boundaryRange={configPagination.boundaryRange}
            siblingRange={configPagination.siblingRange}
            totalPages={Math.ceil(listEngagementsFromStore.length / configPagination.itemPerPage)}
            handelOnChangePage={handelOnChangePage}
            showFirstAndLastNav={false}
          />
        )
      }
    </Container>
  )
}

export default ListEngagement