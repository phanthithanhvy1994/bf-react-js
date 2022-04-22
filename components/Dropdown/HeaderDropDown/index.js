import React, { useState } from 'react'
import { NavLink, matchPath } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { Menu, Image, Dropdown } from 'src/components'
import { routes } from 'src/config'
import { GroupName_URL } from 'src/config/constants'

import './styles.scss'

const HeaderDropDown = ({ classes, dataSourceName, dataSource, srcImage, srcImageHover, altImage, classImage, signOut, ...props }) => {
  let dropDownClasses = classes ? 'link item ' + classes : 'link item'
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(srcImage)

  const dispatch = useDispatch()

  const handleEnter = () => {
    setOpen(true)
    if (srcImageHover)
      setImage(srcImageHover)
  }
  const handleLeave = () => {
    setOpen(false)
    if (srcImage)
      setImage(srcImage)
  }

  const formatLinkTo = (item) => {
    if (item.id) return `${routes.portfolio.index}/${item.geoCode}/${item.containerCode}/${item.id}/${GroupName_URL.GroupName_DATA_AUTHORIZATION}`
    if (item.href && item.href.includes(':engagementId')) {
      const match = matchPath(window.location.pathname, {
        path: routes.portfolio.detail
      });
      return _.get(match, 'params.engagementId') && item.href.replace(':geoCode', _.get(match, 'params.geoCode'))
        .replace(':containerCode', _.get(match, 'params.containerCode')).replace(':engagementId', _.get(match, 'params.engagementId')) || '/'
    }

    return item.href || '/'
  }

  return (
    <div className='headerdd'>
      <Menu {...props}
        className={classes}>
        {srcImage &&
          <div onMouseMove={handleEnter} onMouseOut={handleLeave} >
            <Image src={image}
              alt={altImage}
              className={classImage} />
          </div>
        }
        <Dropdown icon='angle down' pointing
          text={dataSourceName}
          className={dropDownClasses}
          open={open}
          onMouseMove={handleEnter}
          onMouseOut={handleLeave}>
          <Dropdown.Menu>
            {dataSource.map((item, index) => {
              const linkTo = formatLinkTo(item)
              const onClick = !!item.signoutItem ? () => dispatch(signOut()) : () => setOpen(false)
              return (
                <Dropdown.Item as={NavLink} to={linkTo} key={index} onClick={onClick} disabled={item.disabled} target={(item.id || item.key === 'backToAllEngagements' )? '_blank': ''}>
                  {item.text || item.name}
                </Dropdown.Item>)
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  )
}

HeaderDropDown.propTypes = {
  classes: PropTypes.string,
  dataSourceName: PropTypes.string,
  dataSource: PropTypes.array,
  classImage: PropTypes.string,
  altImage: PropTypes.string,
  srcImageHover: PropTypes.string,
  srcImage: PropTypes.string,
  secondary: PropTypes.bool,
  inverted: PropTypes.bool
}

export default HeaderDropDown
