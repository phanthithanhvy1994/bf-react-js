import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Dropdown } from 'src/components'
import './styles.scss'

const HorizontalMenu = (props) => {
  const { dataSources, classes } = props
  const location = useLocation()
  const { geoCode, containerCode, engagementId } = useParams()

  const getPageName = (path) => path.pathname.replace(`/portfolio/${geoCode}/${containerCode}/${engagementId}/`, '')

  const [activeItem, setActiveItem] = useState(getPageName(location))
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false)

  useEffect(() => {
    const url = getPageName(location)
    setActiveItem(url)
  }, [location])

  const handleItemClick = (parent, child = null) => {
    let activeName = parent.activeItem
    let openMenu = true
    if (!!child) {
      activeName = `${parent.activeItem}-${child.activeItem}`
      openMenu = false
    }
    setActiveItem(activeName)
    setIsOpenSubMenu(openMenu)
  }

  const handleCloseSubMenu = () => {
    if (isOpenSubMenu) {
      setActiveItem(getPageName(location))
      setIsOpenSubMenu(false)
    }
  }

  const renderItems = () => {
    return dataSources.map((obj) =>
      obj.subItems ? (
        <Dropdown
          item
          key={`menu_${obj.name}`}
          text={obj.label}
          aria-label={obj.label}
          icon={isOpenSubMenu ? 'caret up' : ''}
          className={_.includes(activeItem, obj.activeItem) ? 'active' : ''}
          open={isOpenSubMenu}
          onClick={() => handleItemClick(obj)}
          onMouseLeave={handleCloseSubMenu}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              key='sub_menu_transparent'
              className='bg_transparent'
            ></Dropdown.Item>
            {obj.subItems.map((subItem) => (
              <Dropdown.Item
                as={(props) => (
                  <div>
                    <NavLink {...props} />
                  </div>
                )}
                key={`sub_menu_${subItem.name}`}
                onClick={() => handleItemClick(obj, subItem)}
                to={subItem.href
                  .replace(':engagementId', engagementId)
                  .replace(':geoCode', geoCode)
                  .replace(':containerCode', containerCode)}
              >
                {subItem.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Menu.Item
          as={(props) => (
            <div>
              <NavLink {...props} />
            </div>
          )}
          key={`menu_${obj.name}`}
          name={obj.name}
          aria-label={obj.label}
          active={
            obj.href
              .replace(':engagementId', engagementId)
              .replace(':geoCode', geoCode)
              .replace(':containerCode', containerCode) ===
            window.location.pathname
          }
          to={obj.href
            .replace(':engagementId', engagementId)
            .replace(':geoCode', geoCode)
            .replace(':containerCode', containerCode)}
        >
          {obj.label}
        </Menu.Item>
      )
    )
  }

  return (
    <div className={classes}>
      <Menu>
        {renderItems()}
      </Menu>
    </div>
  )
}

HorizontalMenu.propTypes = {
  dataSources: PropTypes.array,
  classes:  PropTypes.string
}

export default HorizontalMenu