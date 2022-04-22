import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from 'src/containers/Common/Header'
import Footer from 'src/containers/Common/Footer'
import Toast from 'src/containers/Common/ToastMessage'
import BasicModal from 'src/containers/Common/Modal'
import ErrorModal from 'src/containers/Common/Modal/ErrorModal'
import SignoutModal from 'src/containers/Common/Modal/SignoutModal'
import Loading from 'src/containers/Common/Loading'
import { getUserSettingThunk } from 'src/containers/Setting/UserProfile/Redux'

import './_default.scss'
import LayoutContext from './context'

const DefaultLayout = ({ children }) => {
  const dispatch = useDispatch()
  const [showEngagementDropdown, setShowEngagementDropdown] = useState(false)
  const [showBackPortfolio, setShowBackPortfolio] = useState(false)
  
  useEffect(() => {
    dispatch(getUserSettingThunk())
  }, [])

  return (
    <div className='app-container'>
      <div className='layout-default'>
        <LayoutContext.Provider
          value={{
            showEngagementDropdown,
            setShowEngagementDropdown,
            showBackPortfolio,
            setShowBackPortfolio
          }} >
          <Header />
          <div className='main-bf'>{children}</div>
          <Footer />
        </LayoutContext.Provider>
        <Toast />
        <BasicModal />
        <ErrorModal />
        <Loading />
        <SignoutModal />
      </div>
    </div>
  )
}
export default DefaultLayout