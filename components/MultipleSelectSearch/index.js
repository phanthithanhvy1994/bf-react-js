import React, { useState, useRef, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Search } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { Image, Input, Checkbox } from 'src/components'
import closeIcon from 'src/assets/icons/svgs/close_icon.svg'
import closeIconDisabled from 'src/assets/icons/svgs/close_icon_disabled.svg'
import { OPTIONS_LIMIT } from 'src/config/constants'

import { TIMEOUT_DEFAULT } from './constants'
import messages from './messages'
import './styles.scss'

const MultipleSelectSearch = (props) => {
  const inputProps = props
  const multipleSelectSearchRef = useRef()
  const { control, getValues, formState: { errors }, trigger } = useFormContext()
  const [result, setResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isFocus, setIsFocus] = useState(false)
  const [isNoResult, setIsNoResult] = useState(false)
  const [isInactive, setIsInactive] = useState(true)
  const hasError = _.has(errors, `${inputProps.name}.message`)
  const options = inputProps?.options?.map((option) => {
    return {
      title: option.text,
      value: option.value,
      key: option.key
    }
  }) || []
  const typingTimeoutRef = useRef(null)

  const handleFocus = () => {
    setIsFocus(true)
  }

  const handleBlur = () => {
    trigger(inputProps.name)
    setIsFocus(false)
  }

  useEffect(() => {
    setResult([])
  }, [inputProps?.resetResultDependField])

  const handleFocusSearchInput = (searchValue) => {
    if (result?.length < 1 && searchValue) {
      handleSearchChange({ value: searchValue })
    }
  }

  const handleSearchChange = async ({ value }) => {
    setSearchValue(value)
    const clearSearchAsync = () => typingTimeoutRef.current && clearTimeout(typingTimeoutRef.current)

    if (!value) {
      setIsNoResult(false)
      setIsInactive(true)
      clearSearchAsync()
      return setResult([])
    }

    let findResult = []

    if (inputProps?.handleSearchChange) {
      clearSearchAsync()

      typingTimeoutRef.current = setTimeout(async () => {
        findResult = await inputProps.handleSearchChange(value)
        setResult(findResult)
        if (_.isEmpty(findResult)) {
          setIsNoResult(true)
        } else {
          setIsNoResult(false)
        }
        setIsInactive(false)
        setHeightMultiSelectSearch(inputProps?.optionsLimit)
      }, inputProps.typingTimeOut ? inputProps.typingTimeOut : TIMEOUT_DEFAULT)

    } else {
      const re = new RegExp(_.escapeRegExp(value), 'i')

      findResult = _.filter(options, (option) => {
        return re.test(option.title)
      })

      setResult(findResult)
      setIsInactive(false)
      setHeightMultiSelectSearch(inputProps?.optionsLimit)
    }
  }

  const removeDisabledValue = (item, props) => {
    const currentValue = getValues(inputProps.name)
    const newValue = currentValue.filter(valueInArr => valueInArr.value !== item.value)
    if (_.isEmpty(newValue)) {
      inputProps.removePreviousCountry()
    } else {
      props.onChange(newValue)
    }
  }

  const handleCheckValue = (checked, dataChecked, props) => {
    const currentValue = getValues(inputProps.name)

    if (checked) {
      const newValue = [...currentValue, dataChecked]
      props.onChange(newValue)
    } else {
      const newValue = currentValue.filter(valueInArr => valueInArr.value !== dataChecked.value)
      props.onChange(newValue)
    }
  }

  const resultRenderer = (result, props) =>
    <Checkbox key={result.value}
      label={result.title}
      onChange={(e, data) => handleCheckValue(data.checked, { title: result.title, value: result.value }, props)}
      value={result.value}
      checked={props?.value?.some(item => item.value === result.value)}
      disabled={result.disabled || false}
    />

  const setHeightMultiSelectSearch = (limitOptions = OPTIONS_LIMIT) => {
    const multipleSelectSearchResults = multipleSelectSearchRef.current?.querySelector('.results')
    if (multipleSelectSearchResults) {
      const options = multipleSelectSearchResults.querySelectorAll('.result')
      let limitOptionsHeight = 0
      if (options.length > limitOptions) {
        for (let i = 0; i < limitOptions; i++) {
          limitOptionsHeight += options[i].clientHeight
        }
        multipleSelectSearchResults.style.maxHeight = limitOptionsHeight + 'px'
      }
    }
  }

  return (
    <div ref={multipleSelectSearchRef} className='multiple-select-search'>
      <Controller
        name={inputProps.name}
        control={control}
        rules={inputProps.validationForm}
        render={({ ref, ...props }) =>
          <>
            {props?.value?.length > 0 && <div className='multiple-select-search__values'>
              {props?.value?.map((item, idx) => <div key={idx} className={`multiple-select-search__value ${!!inputProps.disabled && 'disabled'}`}>{item.title}
                <Image src={!!inputProps.disabled ? closeIconDisabled : closeIcon} onClick={() => !!inputProps.disabled ? removeDisabledValue(item, props) : handleCheckValue(false, item, props)} />
              </div>)}
            </div>}
            <Search
              input={
                <Input
                  icon={<>{ searchValue ? '' : <i className='search-icon' /> } <i className='arrow-down' /></>}
                  className='multiple-select-search__input'
                  placeholder={messages.inputPlaceholder.defaultMessage}
                  disabled={!!inputProps.disabled}
                  onFocus={() => handleFocusSearchInput(searchValue)}
                />
              }
              minCharacters={0}
              loading={false}
              showNoResults={isNoResult}
              onBlur={(e, data) => handleBlur(data, props)}
              onFocus={(e, data) => handleFocus(data)}
              onSearchChange={(e, data) => handleSearchChange(data)}
              resultRenderer={(result) => resultRenderer(result, props)}
              results={result}
              value={searchValue}
              className={`${hasError && 'error' || ''} ${isInactive && 'inactive' || ''} ${isFocus ? 'visible' : 'invisible'}`}
            />
            <div className='message'>
              {_.has(errors, `${inputProps.name}.message`) && <div className='error'>
                {_.get(errors, `${inputProps.name}.message`, '')}
              </div>}
            </div>
          </>
        }
        defaultValue={inputProps?.defaultValue || []}
      />
    </div>
  )
}

MultipleSelectSearch.propTypes = {
  name: PropTypes.string.isRequired,
  validationForm: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
  })),
  resetResultDependField: PropTypes.any,
  handleSearchChange: PropTypes.func,
  typingTimeOut: PropTypes.number,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.arrayOf(PropTypes.object),
  removePreviousCountry: PropTypes.func
}

export default MultipleSelectSearch
