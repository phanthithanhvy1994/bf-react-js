import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'

import Icon from 'src/assets/icons/svgs/user_profile_icon.svg'
import IconHover from 'src/assets/icons/svgs/user_profile_icon_hover.svg'
import { HeaderDropDown } from 'src/components'

import SignOut from './SignOut'
import { dataSource, dataSourceWithEngagement, altUser } from './constants'
import './styles.scss'

const Setting = (props) => {
  const { user } = useSelector((state) => state.account.currentUser)
  const { showEngagementDropdown } = props
  const dataSourceBase = showEngagementDropdown ? dataSourceWithEngagement : dataSource
  const { formatMessage } = useIntl()

  return (
    <HeaderDropDown
      inverted secondary
      srcImage={Icon}
      srcImageHover={IconHover}
      altImage={formatMessage(altUser)}
      classImage='headerdd__icon-profile'
      dataSourceName={_.get(user, 'fullName', '')}
      dataSource={dataSourceBase}
      signOut={SignOut}
      classes='menu-user-profile' />
  );
};

Setting.propTypes = {
  showEngagementDropdown: PropTypes.bool
}

export default Setting