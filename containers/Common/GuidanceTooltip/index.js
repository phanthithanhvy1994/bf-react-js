import React from 'react'
import { useIntl } from 'react-intl'

import { Popup } from 'src/components'

import { guidanceTooltipMsg } from './constants'
import './styles.scss'

const GuidanceTooltip = (props) => {
  const intl = useIntl()
  const { titleProps, itemProps = [], className } = props
  const { title, email, lastAndFirstName, lastName, firstName } = guidanceTooltipMsg
  const tooltipTitle = titleProps ?? intl.formatMessage(title)
  const tooltipItems =
    itemProps.length
      ? itemProps
      : [
        intl.formatMessage(email),
        intl.formatMessage(lastAndFirstName),
        intl.formatMessage(lastName),
        intl.formatMessage(firstName)
      ]

  return (
    <Popup className={`guidance-tooltip ${className || ''}`} trigger={<i className='guidance-tooltip-icon' />} position='right center' flowing>
      <span>{tooltipTitle}</span>
      <ul className='guidance-tooltip__content'>
        {
          tooltipItems.map((item, idx) => (
            <li key={`guidance-tooltip-${idx}`}>{item}</li>
          ))
        }
      </ul>
    </Popup>
  )
}

export default GuidanceTooltip