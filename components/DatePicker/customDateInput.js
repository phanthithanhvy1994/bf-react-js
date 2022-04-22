import React, { forwardRef } from 'react'
import { Input } from 'src/components'

const CustomDateInput = ((props) => {
  let value = props.value ?
    (!!props.noLocalDateTime ?
      window.localize.toLocaleDate(props.value)
      : window.localize.toLocalDate(props.value)
    ) : props.value
  let iconProps = { className: 'regular', name: props.iconName || 'calendar minus outline', size: props.iconSize || 'small' }
  return (
    <Input
      disabled={props.disabled}
      onClick={props.onClick}
      value={value}
      icon={iconProps}
      readOnly={true}
      className={props.inputClasses}
    />
  )
})
export default forwardRef(CustomDateInput)
