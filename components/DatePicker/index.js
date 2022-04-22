import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'

import CustomDateInput from './customDateInput'
import CustomDateHeader from './customDateHeader'
import { nameOfDay } from './constants'
import './styles.scss'

const UIDatePicker = (props) => {
  const inputProps = props
  const minDate = props.minDate ? new Date(props.minDate) : null
  const maxDate = props.maxDate ? new Date(props.maxDate) : null
  const [ focused, setFocused ] = useState(false)
  const { control, trigger, formState: { errors } } = useFormContext()

  const handleBlur = () => {
    setFocused(false)
    trigger(inputProps.name)
  }

  const handleFocus = () => {
    setFocused(true)
  }

  const handleOnChange = (value) => {
    setFocused(false)
    if(inputProps.onChange) {
      inputProps.onChange(value)
    }
  }

  const formatWeekDay = (dayName) => {
    const listDayDisplayTwoChar = [nameOfDay.sunday, nameOfDay.saturday, nameOfDay.thursday]

    if (listDayDisplayTwoChar.includes(dayName)) {
      return dayName.substr(0, 2)
    }

    return dayName.substr(0, 1)
  }
  return (
    <div className='react-datepicker--container__custom'>
      <Controller
        control={control}
        name={inputProps.name}
        rules={inputProps.validationForm}
        render={({ onChange, onBlur, value, name, ref, ...props }) => (
          <>
            <DatePicker
              customInput={
                <CustomDateInput
                  iconName={inputProps.iconName}
                  iconSize={inputProps.iconSize}
                  noLocalDateTime={inputProps.noLocalDateTime}
                  inputClasses={`form-control ${ focused ? 'keep-focus' : ''} ${_.has(errors, `${inputProps.name}.message`) ? 'error' : ''}`}
                />
              }
              onChange={(date) => {
                onChange(date)
              }}
              onCalendarOpen={handleFocus}
              onClickOutside={handleBlur}
              onSelect={(value) => handleOnChange(value)}
              selected={value}
              renderCustomHeader={CustomDateHeader}
              formatWeekDay={formatWeekDay}
              minDate={minDate}
              maxDate={maxDate}
              disabledDayAriaLabelPrefix
              disabled={inputProps.disabled}
              disabledKeyboardNavigation
            />
            <div className='message'>
              {_.has(errors, `${inputProps.name}.message`) && <div className='error'>{errors[inputProps.name]?.message}</div>}
            </div>
          </>
        )}
      />
    </div>
  )
}

UIDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  validationForm: PropTypes.object
}

export default UIDatePicker