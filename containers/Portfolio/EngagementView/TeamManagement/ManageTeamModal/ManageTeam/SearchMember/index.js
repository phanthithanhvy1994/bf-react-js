import React, { useState, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Input, Search } from 'src/components'

import { KEYCODE, SEARCH_TYPE } from './constants'
import messages from './messages'
import './styles.scss'

const SearchMember = (props) => {
  const inputProps = props
  const { control, formState } = useFormContext()
  const { errors } = formState
  const [result, setResult] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isOpenResult, setIsOpenResult] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const hasError = _.has(errors, `${inputProps.name}.message`)
  const typeError = _.get(errors, `${inputProps.name}.type`)
  const searchMemberRef = useRef()

  const handleSearchChange = async ({ value }, type) => {
    const input = searchMemberRef.current?.querySelector('input')
    if (input) input.focus()
    const isDuplicateSearchValue = value === searchValue && result.length > 0
    if (isDuplicateSearchValue) return
    setSearchValue(value)
    setResult([])
    if (isOpenResult) setIsOpenResult(false)
    const isValidSearchInput = _.isFunction(inputProps.validateSearchValue) && inputProps.validateSearchValue(value)
    const isValidSearchType = type === SEARCH_TYPE.ClickIcon || type === SEARCH_TYPE.Enter
    if (!value || !isValidSearchInput || !isValidSearchType || isSearching) return
    let findResult = []
    setIsSearching(true)

    if (inputProps?.handleSearchChange) {
      findResult = await inputProps.handleSearchChange(value)
    }
    setResult(findResult)
    setIsOpenResult(true)
    setIsSearching(false)
    const resultPanel = searchMemberRef.current?.querySelector('.results.transition')
    if (resultPanel) resultPanel.scroll(0,0)
  }

  const handleResultSelect = ({ result }) => {
    setIsOpenResult(false)
    if (inputProps?.handleResultSelected) inputProps?.handleResultSelected?.(result)
  }

  const resultRenderer = (result, props) => {
    if (inputProps?.resultRenderer) return inputProps?.resultRenderer(result, props)
    return result.title
  }

  const handleEnterSearch = (e) => {
    if (e.keyCode === KEYCODE.Enter) {
      handleSearchChange({ value: e.target.value }, SEARCH_TYPE.Enter)
      e.preventDefault()
    }
  }

  const handleBlur = () => {
    setIsFocus(false)
    setIsOpenResult(false)
  }

  const handleFocus = () => {
    setIsFocus(true)
    if (result.length > 0) {
      setIsOpenResult(true)
    }
  }

  const renderError = () => {
    if (!hasError) return

    return (
      <>
        {
          isFocus && typeError === 'common' &&
          (<div className='common'>
            <div className='error'>
              {_.get(errors, `${inputProps.name}.message`, '')}
            </div>
          </div>)
        }
      </>
    )
  }

  return (
    <div className='search-member' ref={searchMemberRef}>
      <Controller
        name={inputProps.name}
        control={control}
        rules={inputProps.validationForm}
        render={({ ref, ...props }) =>
          <>
            <Search
              input={
                <Input
                  icon={
                    <i className='search-icon'
                      onClick={() => !isSearching && handleSearchChange({ value: searchValue }, SEARCH_TYPE.ClickIcon)}
                    />
                  }
                  placeholder={inputProps?.placeholder || messages.inputPlaceholder.defaultMessage}
                  disabled={!!inputProps.disabled}
                  onKeyDown={e => handleEnterSearch(e)}
                  onBlur={handleBlur}
                  onFocus={handleFocus}
                  className={`${isSearching ? 'searching' : ''} ${searchValue ? 'input-pale-blue' : ''}`}
                  id='search-input'
                />
              }
              open={isOpenResult}
              minCharacters={inputProps?.minCharacters || 3}
              onSearchChange={(e, data) => handleSearchChange(data, SEARCH_TYPE.Typing)}
              resultRenderer={(result) => resultRenderer(result, props)}
              onResultSelect={(e, result) => handleResultSelect(result, props)}
              noResultsMessage={inputProps?.noResultsMessage || ''}
              noResultsDescription={inputProps?.noResultsDescription || ''}
              results={result}
              value={searchValue}
            />
            {renderError()}
          </>
        }
        defaultValue={inputProps?.defaultValue || ''}
      />
    </div>
  )
}

export default SearchMember
