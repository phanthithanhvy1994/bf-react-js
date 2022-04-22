import React, { useState, useRef, useEffect } from 'react'
import { Popup } from 'src/components'

import './styles.scss'

const OverflowTooltip = ({ content }) => {
  const [isOverflow, setIsOverflow] = useState(false)
  const ref = useRef(null)

  const handleMouseOver = () => {
    let isTextOverFlow = false
    const node = ref.current
    if(!node) return
    isTextOverFlow = node.scrollWidth > node.offsetWidth || node.scrollWidth > node.clientWidth
    setIsOverflow(isTextOverFlow)
  }

  useEffect (() => {
    const node = ref.current
    if (node) {
      node.addEventListener('mouseover', handleMouseOver)
      return () => {
        node.removeEventListener('mouseover', handleMouseOver)
      }
    }
  },[ref.current])

  return (
    <Popup
      pinned
      wide
      className={`${!isOverflow ? 'popup--invisible' : 'engagement-clm-tooltip'}`}
      trigger={<div className='div--truncated' ref={ref}>{content}</div>}
      content={content}
      on='hover'
      position='top center'
    />
  )
}

export default OverflowTooltip
