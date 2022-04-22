import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { Input } from 'src/components'

const LimitCounter = (props) => {
  const inputProps = props
  const {
    control,
    getValues,
    formState: { errors }
  } = useFormContext()
  const [inputLength, setInputLength] = useState(0)
  const [isFocus, setIsFocus] = useState(false)
  const [isBlur, setIsBlur] = useState(false)
  const [invalidCharacters, setInvalidCharacters] = useState([])
  const [keyDownId, setKeyDownId] = useState(0)
  const invalidCharacterConfig = _.get(inputProps, 'validationForm.pattern.invalidCharacters', [])
  const sessionPasteName = `${inputProps.name}Paste`
  const sessionCutName = `${inputProps.name}Cut`

  useEffect(() => {
    if (isBlur && !_.has(errors, `${inputProps.name}.message`)) {
      setIsFocus(false)
    }
  }, [isBlur, invalidCharacters])

  useEffect(() => {
    const controlValue = getValues(inputProps.name)
    handleInvalidCharacters(controlValue)
  }, [])

  const handleChange = (e, props) => {
    const value = e.target.value || ''
    const clipboardData = sessionStorage.getItem(sessionPasteName)
    const isCut = sessionStorage.getItem(sessionCutName)
    if (
      value.length > inputProps.validationForm?.maxLength?.value &&
      _.isEmpty(clipboardData) &&
      _.isEmpty(isCut) &&
      keyDownId != 8 &&
      keyDownId != 46
    ) {
      return
    }
    setInputLength(value.length)
    handleInvalidCharacters(value)
    sessionStorage.removeItem(sessionPasteName)
    sessionStorage.removeItem(sessionCutName)
    props.onChange(value)
  }

  const handleFocus = (e) => {
    const value = e.target.value || ''
    setInputLength(value.length)
    setIsFocus(true)
    setIsBlur(false)
  }

  const handleBlur = (e, props) => {
    e.target.value = e.target.value.trim()
    props.onBlur(e)
    setIsBlur(true)
    setIsFocus(false)
  }

  const handleInvalidCharacters = (value) => {
    const temp = []

    if (!_.isEmpty(invalidCharacterConfig)) {
      _.forEach(invalidCharacterConfig, (char) => {
        if (value?.includes(char) && _.indexOf(temp, char) === -1) {
          if (
            !_.isEmpty(temp) &&
            value.indexOf(char) < value.indexOf(temp[0])
          ) {
            temp.unshift(char)
          } else {
            temp.push(char)
          }
        }
      })
    }
    setInvalidCharacters(temp)
  }

  const invalidCharactersMsg = () =>
    invalidCharacters.length > 1 ? (
      <FormattedMessage
        id='Common.SystemValidationInvalidCharacters'
        values={{ characters: invalidCharacters.join(' ') }}
      />
    ) : (
      <FormattedMessage
        id='Common.SystemValidationInvalidCharacter'
        values={{ characters: invalidCharacters.join(' ') }}
      />
    )

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData?.getData('Text')
    if (!_.isEmpty(clipboardData)) {
      sessionStorage.setItem(sessionPasteName, clipboardData)
    }
  }

  const handleKeyDown = (e) => {
    setKeyDownId(e.keyCode)
  }

  const handleOnCut = () => {
    sessionStorage.setItem(sessionCutName, 'true')
  }

  return (
    <Controller
      name={inputProps.name}
      control={control}
      rules={inputProps.validationForm}
      defaultValue=''
      render={({ value, name, ref, ...props }) => (
        <>
          <Input
            name={inputProps.name}
            type='text'
            className='form-control'
            onChange={(e) => handleChange(e, props)}
            onKeyDown={(e) => handleKeyDown(e)}
            onCut={handleOnCut}
            onPaste={(e) => handlePaste(e)}
            onFocus={handleFocus}
            onBlur={(e) => {
              handleBlur(e, props)
            }}
            value={value}
            error={_.has(errors, `${inputProps.name}.message`)}
            onPaste={(e) => handlePaste(e)}
            disabled={!!inputProps.disabled}
            autoComplete='off'
          />
          <div className='message'>
            {!isFocus && _.has(errors, `${inputProps.name}.message`) && (
              <div className='error'>
                {_.get(errors, `${inputProps.name}.type`) != 'pattern' &&
                  _.get(errors, `${inputProps.name}.message`, '')}
                {_.get(errors, `${inputProps.name}.type`) == 'pattern' &&
                  invalidCharactersMsg()}
              </div>
            )}
            {(isFocus && inputProps.validationForm) && (
              <div
                className={`limit-counter-length ${
                  _.has(errors, `${inputProps.name}.message`) ? 'error' : ''
                }`}
              >
                {inputLength}/{inputProps.validationForm.maxLength.value}
              </div>
            )}
          </div>
        </>
      )}
    />
  )
}

LimitCounter.propTypes = {
  name: PropTypes.string.isRequired,
  validationForm: PropTypes.object
}

export default LimitCounter