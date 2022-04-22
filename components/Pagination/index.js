import React, { useState } from 'react'
import { Pagination, Icon } from 'semantic-ui-react'
import './styles.scss'

const UIPagination = (props) => {
  const { handelOnChangePage, boundaryRange, siblingRange, totalPages, showFirstAndLastNav} = props
  const [activePage, setActivePage] = useState(props.activePage)

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage)
    handelOnChangePage(activePage)
  };

  return (
    <div className='wrapper-pagination'>
      <Pagination
        activePage={activePage}
        size='mini'
        boundaryRange={boundaryRange}
        siblingRange={siblingRange}
        totalPages={totalPages}
        onPageChange={handlePaginationChange}
        firstItem={showFirstAndLastNav ? undefined : null}
        lastItem={showFirstAndLastNav ? undefined : null}
        prevItem={{ content: <Icon name='angle left' />, icon: true }}
        nextItem={{ content: <Icon name='angle right' />, icon: true }}
      />
    </div>
  )
}

export default UIPagination
