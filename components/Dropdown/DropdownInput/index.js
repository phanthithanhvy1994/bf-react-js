import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Dropdown, Popup } from 'src/components'

import './styles.scss'

const DropdownInput = (props) => {
  const inputProps = props
  const {
    control,
    trigger,
    formState: { errors }
  } = useFormContext()
  const [options, setOptions] = useState(inputProps.options)
  const [invalidCharacters, setInvalidCharacters] = useState([])
  const invalidCharacterConfig = _.get(inputProps, 'validationForm.pattern.invalidCharacters', [])

  const handleBlur = () => {
    trigger(inputProps.name)
  }

  useEffect(() => {
    setOptions(inputProps.options)
  }, [inputProps.options])

  const handleAddition = (props, value) => {
    options.splice(0, 0, { text: value, value })
    setOptions(options)
    handleInvalidCharacters(value)
    props.onChange(value)
  }

  const handleChange = (props, value) => {
    const optionSeleted = options.find(x => x.value == value)
    if(optionSeleted?.disabled){
      value = null
    }
    handleInvalidCharacters(value)
    props.onChange(value)
    _.isFunction(inputProps.onChange) && inputProps.onChange(value)
  }

  const handleInvalidCharacters = (value) => {
    let temp = []

    if (!_.isEmpty(invalidCharacterConfig)) {
      _.forEach(invalidCharacterConfig, (char) => {
        if (value.includes(char) && _.indexOf(temp, char) === -1) {
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

  const renderContent = (ref, props) => {
    const mainContent = (
      <div>
        <Dropdown
          icon={inputProps?.icon || <i className='arrow-down' />}
          onChange={(e, { value }) => handleChange(props, value)}
          value={props.value}
          search
          selection
          options={options}
          fluid
          selectOnBlur={false}
          onBlur={handleBlur}
          clearable={!!inputProps.clearable}
          allowAdditions={inputProps.allowAdditions || false}
          onAddItem={(e, { value }) => handleAddition(props, value)}
          disabled={!!inputProps.disabled}
          error={_.has(errors, `${inputProps.name}.message`)}
          placeholder={inputProps?.placeholder || ''}
          upward={false}
        />
          {_.has(errors, `${inputProps.name}.message`) && (
          <div className='message'>
            <div className='error'>
              {_.get(errors, `${inputProps.name}.type`) != 'pattern' &&
                _.get(errors, `${inputProps.name}.message`, '')}
              {_.get(errors, `${inputProps.name}.type`) == 'pattern' &&
                invalidCharactersMsg()}
            </div>
          </div>
          )}
      </div>
    )

    if (inputProps.popupContent)
      return (
        <Popup
          position='top center'
          content={inputProps.popupContent}
          trigger={mainContent}
        />
      )
    return mainContent
  }

  return (
    <>
      <Controller
        name={inputProps.name}
        control={control}
        rules={inputProps.validationForm}
        render={({ ref, ...props }) => renderContent(ref, props)}
        defaultValue={inputProps?.defaultValue || ''}
      />
    </>
  )
}

DropdownInput.propTypes = {
  name: PropTypes.string.isRequired,
  classes:  PropTypes.string,
  options: PropTypes.array,
  validationForm: PropTypes.object,
  icon: PropTypes.oneOfType([PropTypes.element,PropTypes.string]),
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  allowAdditions: PropTypes.bool,
  clearable: PropTypes.bool,
  onChange: PropTypes.func
}

export default DropdownInput
