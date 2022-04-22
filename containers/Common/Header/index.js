import React, { useEffect, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { getEngagementsByCurrentUserThunk } from 'src/containers/Portfolio/Redux'
import { Container, Image, Menu, Link } from 'src/components'
import { routes } from 'src/config'
import LayoutContext from 'src/layouts/context'
import Logo from 'src/assets/images/logos/logo_Project Name_GroupNameflow.svg'
import Devider from 'src/assets/icons/svgs/devider.svg'
import messages from './messages'
import Setting from 'src/containers/Setting'

import EngagementDropdown from './EngagementDropdown'
import SupportService from './SupportService'
import './styles.scss'

function Header(props) {
  const { showEngagementDropdown, showBackPortfolio } = useContext(LayoutContext)

  const dispatch = useDispatch()
  useEffect(() => {
    if(showEngagementDropdown)
      dispatch(getEngagementsByCurrentUserThunk({}))
  }, [showEngagementDropdown])

  return (
    <div className={`header-bf${showEngagementDropdown ? ' header-detail' : ''}`}>
      <Container>
        <Menu attached='top' tabular className='header-bf__menu'>
          <Menu.Item className='header-bf__item-logo'>
            <Link href={routes.index}>
              <Image className='header-bf__logo-Project Name' src={Logo} alt='Project Name GroupNameFlow' />
            </Link>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item className='header-bf__item-engagement'>
              {showEngagementDropdown && <EngagementDropdown />}
              {showBackPortfolio && <Link href={routes.index} text={<FormattedMessage {...messages.backToPortfolioView}/>} />}
            </Menu.Item>
            <Menu.Item className='header-bf__item-devider'>
              <Image src={Devider} alt='Devider' />
            </Menu.Item>
            <Menu.Item className='header-bf__item-icon'>
              <SupportService />
            </Menu.Item>
            <Menu.Item className='header-bf__item-profile'>
              <Setting showEngagementDropdown={showEngagementDropdown} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    </div>
  );
}

export default Header