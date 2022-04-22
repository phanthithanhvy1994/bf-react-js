import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Checkbox } from 'src/components'
import '../UICheckbox/styles.scss'

const CheckboxControl = (props) => {
  const inputProps = props
  const { control } = useFormContext()

  const handleChange = (data, props) => {
    props.onChange({checked: data.checked, value: props.value.value, label: data.label})
    _.isFunction(inputProps.onChange) && inputProps.onChange({checked: data.checked, value: props.value.value, label: data.label})
  }

  return (
    <>
      <Controller
          name={inputProps.name}
          control={control}
          render={(props) => (
            <Checkbox
              label={props.value.label}
              onChange={(e, data) => handleChange(data, props)}
              checked={props.value.checked}
              disabled={inputProps?.disabled}
            />
          )}
          defaultValue={{
            checked: inputProps?.checked || false,
            value: inputProps?.value || '',
            label: inputProps?.label || ''
          }}
        />
    </>
  )
}

CheckboxControl.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool
}

export default CheckboxControl