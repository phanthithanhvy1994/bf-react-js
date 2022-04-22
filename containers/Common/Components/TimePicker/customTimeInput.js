import React, { forwardRef, useEffect, useState } from 'react'
import { Icon, Input } from 'src/components'
import { timeType, timeConstraint, padValues, timeCounterType } from './constants'

const CustomTimeInput = (props, ref) => {
  const { value } = props
  const numberRegex = /^[0-9\b]+$/
  let defaultHours = ''
  let defaultMinutes = ''
  if (!_.isEmpty(value)) {
    const defaultValues = value.split(':')
    defaultHours = defaultValues[0]
    defaultMinutes = defaultValues[1]
  }

  const createConstraints = () => {
    let constraints = {}
    Object.keys(timeConstraint).forEach(type => {
      constraints[type] = { ...timeConstraint[type] }
    })

    return constraints
  }

  const pad = (type, value) => {
    let str = `${parseInt(value, 10) || 0}`
    while (str.length < padValues[type]) {
      str = `0${str}`
    }
    return str
  }

  const constraints = createConstraints()
  const [hours, setHours] = useState(defaultHours)
  const [minutes, setMinutes] = useState(defaultMinutes)
  const [changingHours, setChangingHours] = useState(defaultHours)
  const [changingMinutes, setChangingMinutes] = useState(defaultMinutes)

  const increase = (type, source) => {
    const tc = constraints[type]
    let value = (parseInt(source, 10) || 0) + tc.step
    if (value > tc.max) {
      value = tc.min + (value - (tc.max + 1))
    }
    return pad(type, value)
  }

  const decrease = (type, source) => {
    const tc = constraints[type]
    let value = (parseInt(source, 10) || 0) - tc.step
    if (value < tc.min) {
      value = tc.max + 1 - (tc.min - value)
    }
    return pad(type, value)
  }

  const updateTimeType = (value, type) => {
    if (type === timeType.hours) setHours(value)
    if (type === timeType.minutes) setMinutes(value)
  }

  const updateChangingTimeType = (value, type) => {
    if (type === timeType.hours) setChangingHours(value)
    if (type === timeType.minutes) setChangingMinutes(value)
  }

  const onClick = (e, action, type, value) => {
    let result
    if (action === timeCounterType.increase) {
      result = increase(type, value)
    } else if (action === timeCounterType.decrease) {
      result = decrease(type, value)
    }
    updateTimeType(result, type)
    updateChangingTimeType(result, type)
  }

  const handleOnChange = (value, type) => {
    updateChangingTimeType(value, type)
  }

  const handleOnBlur = (value, type) => {
    const tc = constraints[type]
    const result = parseInt(value, 10)
    if (result < tc.min || result > tc.max || !numberRegex.test(value)) {
      if (type === timeType.hours) setChangingHours(hours)
      if (type === timeType.minutes) setChangingMinutes(minutes)
    } else {
      const formattedValue = pad(type, result)
      updateTimeType(formattedValue, type)
      updateChangingTimeType(formattedValue, type)
    }
  }

  useEffect(() => {
    if (hours || minutes) {
      props.onChange(`${hours}:${minutes}`)
    }
  }, [hours, minutes])

  const renderPicker = (type, value) => {
    return (
      <div className={`custom-time-input__block --${type}-picker`}>
        <Icon
          name={'angle up'}
          onClick={(e) => onClick(e, timeCounterType.increase, type, value)}
        />
        <Input
          type={'number'}
          value={value}
          onChange={(e) => handleOnChange(e.target.value, type)}
          onBlur={(e) => handleOnBlur(e.target.value, type)}
        />
        <Icon
          name={'angle down'}
          onClick={(e) => onClick(e, timeCounterType.decrease, type, value)}
        />
      </div>
    )
  }

  return (
    <div className={'custom-time-input'}>
      {renderPicker(timeType.hours, changingHours)}
      {renderPicker(timeType.minutes, changingMinutes)}
    </div>
  )
}

export default forwardRef(CustomTimeInput)