import React from 'react'
import { AS } from './constants'
import './styles.scss'

const Typography = (props) => {
  const { as, className } = props

  const getUI = () => {
    let ui = null
    switch (as) {
      case AS.heading1:
        ui = <h1 className={`typo-${AS.heading1} ${className || ''}`}>{props.children}</h1>
        break
      case AS.heading2:
        ui = <h2 className={`typo-${AS.heading2} ${className || ''}`}>{props.children}</h2>
        break
      default:
        ui = <p className={`typo-${as} ${className || ''}`}>{props.children}</p>
        break
    }

    return ui
  }

  return getUI()
}

Typography.As = AS

export default Typography
