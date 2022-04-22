import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CustomInput from './customInput'
import CustomTimeInput from './customTimeInput'
import './styles.scss'

const UITimePicker = (props) => {
  const inputProps = props
  const [ focused, setFocused ] = useState(false)
  const { control, trigger, formState: { errors } } = useFormContext()

  const handleBlur = () => {
    setFocused(false)
    trigger(inputProps.name)
  }

  const handleFocus = () => {
    setFocused(true)
  }

  return (
    <div className="react-datepicker-time--container__custom">
      <Controller
        control={control}
        name={inputProps.name}
        rules={inputProps.validationForm}
        render={({ onChange, onBlur, value, name, ref }) => (
          <>
            <DatePicker
              customInput={
                <CustomInput
                  keepFocus={focused}
                  hasError={_.has(errors, `${inputProps.name}.message`)}
                />
              }
              customTimeInput={<CustomTimeInput/>}
              selected={value}
              showPopperArrow={false}
              showTimeSelectOnly
              showTimeInput
              dateFormat='HH:mm'
              timeInputLabel=''
              onCalendarOpen={handleFocus}
              onChange={(time) => {
                onChange(time)
                inputProps.onChange(time)
              }}
              onClickOutside={() => handleBlur()}
              disabled={inputProps.disabled}
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

export default UITimePicker