import React, { useState } from 'react'

import { Popup, List } from 'src/components'

import { dataSource } from './constants'

import './styles.scss'

const SupportService = () => {
  const [ isOpen, setIsOpen ] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }
  
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleClick = (link) => {
    setIsOpen(false)
    window.open(link, '_blank')
  }

  const contents = () => {
    return _.map(dataSource, (v, k) => {
      return <List key={v.key} onClick={() => handleClick(v.href)}>
        <List.Item className={`help-icon ${v.key}`}>
          {v.name}
        </List.Item>
      </List>
    })
  }

  return <Popup
    trigger={<span className='header-bf__question-mask'></span>}
    content={contents}
    position='top center'
    on='click'
    open={isOpen}
    onOpen={handleOpen}
    onClose={handleClose}
    className='top-nav-popup-help'
  />
}

export default SupportService