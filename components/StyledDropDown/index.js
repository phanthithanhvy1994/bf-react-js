import React, { useState } from 'react'
import { Menu } from 'src/components'
import PropTypes from 'prop-types'

const StyledDropDown = ({ dataSources }) => {
  const [activeItem, setActiveItem] = useState('')
  function handleItemClick (e, obj) {
    const { name } = obj
    setActiveItem(name)
  }

  return (
    <Menu>
      {
        dataSources.map((obj, idx) => (
          <Menu.Item
            key={idx}
            name={obj.name}
            active = {obj.name === activeItem}
            onClick={(e, obj) => handleItemClick(e, obj)}
          >
            {obj.label}
          </Menu.Item>
        ))
      }
    </Menu>
  )
}


StyledDropDown.propTypes = {
  dataSources: PropTypes.array
}

export default StyledDropDown