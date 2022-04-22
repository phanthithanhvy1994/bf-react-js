import React, { useContext, useEffect } from 'react'

import SubTopNav from './SubTopNav'
import LayoutContext from 'src/layouts/context'
import './styles.scss'

function EngagementViewNav(props) {
  const { setShowEngagementDropdown, setShowBackPortfolio } = useContext(LayoutContext)

  useEffect(() => {
    setShowEngagementDropdown(true)
    setShowBackPortfolio(false)
  }, [])

  return (
    <>
      <SubTopNav />
    </>
  )
}

export default EngagementViewNav