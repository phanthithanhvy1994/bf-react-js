import React, { useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { Search } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const AdditionsDropdown = (props) => {
  const inputProps = props
  const { control, getValues, trigger, formState: { errors } } = useFormContext()
  const [invalidCharacters, setInvalidCharacters] = useState([])
  const [result, setResult] = useState([])
  const [isFocus, setIsFocus] = useState(false)
  const [keyDownId, setKeyDownId] = useState(0)
  const sessionPasteName = inputProps.name + 'Paste'
  const sessionCutName = inputProps.name + 'Cut'
  const options = inputProps?.options.map((option) => {
    return {
      title: option.text,
      value: option.value,
      key: option.key
    }
  }) || []
  const invalidCharacterConfig = _.get(inputProps, 'validationForm.pattern.invalidCharacters', [])
  const hasError = _.has(errors, `${inputProps.name}.message`)

  useEffect(() => {
    const controlValue = getValues(inputProps.name)
    handleInvalidCharacters(controlValue)
  }, [])

  const handleFocus = ({ defaultValue, results }) => {
    setIsFocus(true)
    if (defaultValue && _.isEmpty(results)) {
      setResult(options)
    }
  }

  const handleBlur = ({ value }, props) => {
    !_.isNil(value) && props.onChange(value.trim())
    trigger(inputProps.name)
    setIsFocus(false)
  }

  const handleResultSelect = ({ result }, props) => {
    handleInvalidCharacters(result.value)
    props.onChange(result.value)
  }

  const handleSearchChange = ({ value }, props) => {
    handleInvalidCharacters(value)
    if (value) {
      const clipboardData = sessionStorage.getItem(sessionPasteName)
      const isCut = sessionStorage.getItem(sessionCutName)
      if (value.length > inputProps.validationForm.maxLength?.value && _.isEmpty(clipboardData) && _.isEmpty(isCut)  && keyDownId != 8 && keyDownId != 46) {
        return
      }
      const re = new RegExp(_.escapeRegExp(value), 'i')
      const findResult = _.filter(options, (option) => {
        return re.test(option.title)
      })
      setResult(findResult)
      sessionStorage.removeItem(sessionPasteName)
      sessionStorage.removeItem(sessionCutName)
      props.onChange(value)
    } else {
      props.onChange('')
    }
  }

  const handleInvalidCharacters = (value) => {
    let temp = []

    if (!_.isEmpty(invalidCharacterConfig)) {
      _.forEach(invalidCharacterConfig, (char) => {
        if (value.includes(char) && _.indexOf(temp, char) === -1) {
          if (!_.isEmpty(temp) && value.indexOf(char) < value.indexOf(temp[0])) {
            temp.unshift(char)
          } else {
            temp.push(char)
          }
        }
      })
    }
    setInvalidCharacters(temp)
  }

  const invalidCharactersMsg = () => {
    return invalidCharacters.length > 1 ? <FormattedMessage id='Common.SystemValidationInvalidCharacters' values={{ characters: invalidCharacters.join(' ') }} /> : <FormattedMessage id='Common.SystemValidationInvalidCharacter' values={{ characters: invalidCharacters.join(' ') }} />
  }

  const handlePaste = (e) => {
    const clipboardData = e.clipboardData?.getData('Text')
    if(!_.isEmpty(clipboardData)){
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
    <>
      <Controller
        name={inputProps.name}
        control={control}
        rules={inputProps.validationForm}
        render={({ ref, ...props }) =>
          <Search
            icon={inputProps?.icon || <i className='arrow-down' />}
            minCharacters={0}
            loading={false}
            showNoResults={false}
            onBlur={(e, data) => handleBlur(data, props)}
            onFocus={(e, data) => handleFocus(data)}
            onResultSelect={(e, data) => handleResultSelect(data, props)}
            onSearchChange={(e, data) => handleSearchChange(data, props)}
            onKeyDown={e => handleKeyDown(e)}
            onCut={handleOnCut}
            onPaste={e => handlePaste(e)}
            results={props.value ? result : options}
            value={props.value}
            className={`${hasError && 'error' || ''} ${props.value && result.length < 1 && 'inactive' || ''}`}
          />
        }
      />
      <div className='message'>
        {hasError && !isFocus && <div className='error'>
          {errors[inputProps.name]?.type != 'pattern' && errors[inputProps.name]?.message}
          {errors[inputProps.name]?.type == 'pattern' && invalidCharactersMsg()}
        </div>}
        {isFocus && <div className={`limit-counter-length ${hasError ? 'error' : ''}`}>
          {getValues(inputProps.name)?.length || 0}/{inputProps.validationForm.maxLength.value}
        </div>}
      </div>
    </>
  )
}

AdditionsDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  classes:  PropTypes.string,
  options: PropTypes.array,
  validationForm: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
}

export default AdditionsDropdown
