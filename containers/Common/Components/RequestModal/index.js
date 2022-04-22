import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { TimePicker } from 'src/containers/Common/Components'
import { Button, Image, Tab, Form, Menu, DropdownInput, LimitCounter, DatePicker } from 'src/components'
import { types } from './constants'
import CloseIcon from 'src/assets/icons/svgs/close.svg'

import './styles.scss'

const RequestModal = (props) => {
  const { onClose, contentTabs = [], currentIndex, onChangeTab, currentData } = props
  const [activeIndex, setActiveIndex] = useState(currentIndex)
  const tab = contentTabs[activeIndex] || []

  const { reset, getValues, handleSubmit, formState } = useFormContext()
  const { isDirty, isValid } = formState

  useEffect(() => {
    reset(currentData, { isDirty })
    const index = contentTabs.length !== 1 ? currentIndex : 0
    setActiveIndex(index)
  }, [currentIndex])

  useEffect(() => {
    reset(currentData, { isDirty })
  }, [currentData])

  const handleChange = (data) => {
    tab?.tabChangable && activeIndex != data?.activeIndex && onChangeTab(data?.activeIndex, getValues())
  }

  const renderHeaderTab = () => {
    if (contentTabs.length === 1) {
      return <div className='ui pointing secondary menu'>
        <div className='item single-item'>
          <span>{contentTabs[0].header}</span>
        </div>
      </div>
    }
    
    const panes = []
    _.forEach(contentTabs, (v, k) => {
      panes.push({
        menuItem: <Menu.Item key={k}><span>{v.header}</span></Menu.Item>
      })
    })
    return <Tab
      menu={{ secondary: true, pointing: true }}
      panes={panes}
      activeIndex={activeIndex}
      onTabChange={(e, data) => {
        handleChange(data)
      }}
    />
  }

  const renderButtons = () => {
    return _.map(tab.buttons, (v, k) => {
      const inputProps = _.omit(v, ['label'])
      return <Button key={k} {...inputProps} content={v.label} disabled={v.type === 'submit' && (!isValid || !!v.disabled)} type={v.type || 'button'} />
    })
  }

  const renderContent = () => {
    return <Form id={tab?.form?.id} onSubmit={handleSubmit(tab?.form?.onSubmit)} className={tab?.form?.className}>
      {_.map(tab.content, (v, k) => {
        return renderInput(v, k)
      })}
      <div className='form-buttons'>
        {renderButtons()}
      </div>
    </Form>
  }

  const renderInput = (value, key) => {
    switch (value.type) {
      case types.texting:
        return <h4 key={key} className={value.className}>{value.label}</h4>
      case types.input:
        return (
          <div key={key} className={value.className}>
            <label>{value.label}</label>
            <LimitCounter {...value}></LimitCounter>
          </div>
        )
      case types.dropdown:
        return (
          <div key={key} className={value.className}>
            <label>{value.label}</label>
            <DropdownInput {...value}></DropdownInput>
          </div>
        )
      case types.date:
        return (
          <div key={key} className={value.className}>
            <label>{value.label}</label>
            <DatePicker {...value} />
          </div>
        )
      case types.time:
        return (
          <div key={key} className={value.className}>
            <label>{value.label}</label>
            <TimePicker {...value} />
          </div>
        )
      case types.custom:
        return (
          <div key={key} className={value.className}>
            {value.content}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <div className='request-modal'>
        <div className='request-modal__header'>
          <div className='group'>
            {renderHeaderTab()}
          </div>
          <Image className='close-btn' src={CloseIcon} onClick={onClose}/>
        </div>
        <div className='request-modal__content'>
          {renderContent()}
        </div>
      </div>
      <div className='request-modal-backdrop'></div>
    </>
  )
}

export default RequestModal