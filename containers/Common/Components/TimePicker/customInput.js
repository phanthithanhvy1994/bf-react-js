import React, { forwardRef } from 'react'
import { Input } from 'src/components'

const CustomInput = ({ value, onClick, disabled, keepFocus, hasError }, ref) => {
  const iconProps = { className: 'regular', name: 'clock-svg' }
  return (
    <Input
      icon={iconProps}
      disabled={disabled}
      onClick={onClick}
      value={value}
      readOnly={true}
      className={`custom-input ${keepFocus ? 'keep-focus' : ''} ${hasError ? 'error' : ''}`}
      ref={ref}
      placeholder='hh:mm'
    />
  )
}

export default forwardRef(CustomInput)
