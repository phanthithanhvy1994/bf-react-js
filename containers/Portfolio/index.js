import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useIntl } from 'react-intl'

import { Container, Header, Dropdown, Button, Image, Icon, Popup } from 'src/components'
import addCircleIcon from 'src/assets/icons/svgs/add_circle_icon.svg'
import { listEngagementsSelector,
  submitDeletedEngagementThunk, updateStatusDeletedEngagementList,
  approveDeletionThunk, rejectDeletionThunk, getEngagementsByCurrentUserThunk } from 'src/containers/Portfolio/Redux'
import { showLoading, hideLoading, openModal, closeModal, openErrorModal } from 'src/containers/Common/actions'
import LayoutContext from 'src/layouts/context'
import { REQUEST_MODEL } from 'src/config/constants'
import { defaultGeo, currentReleaseVersion, supportedVersionAndGeo, SUPPORTED_VERSION } from 'src/config'

import ListEngagement from './ListEngagement'
import CreateEngagement from './CreateEngagement'
import DeleteEngagement from './DeleteEngagement'
import { portfolioMessages, steps, actionType, configPagination, actionDelType, creationPrompt } from './constants'
import { statePortfolioReducers } from './services'
import './styles.scss'

function Portfolio() {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { setShowEngagementDropdown, setShowBackPortfolio } = useContext(LayoutContext)
  const [ itemChecked, setItemChecked ] = useState({id: null, isChecked: false, containerCode: '', geoCode: ''})
  const [ statePortfolio, setStatePortfolio ] = useReducer(statePortfolioReducers, {
    openEngCreation: false,
    currentStep: steps.stepOneEC,
    currentData: {}
  })
  const [ isDisabled, setIsDisabled ] = useState(true)
  const listEngagementsFromStore = useSelector(listEngagementsSelector)
  const [listEngagements, setListEngagements] = useState(listEngagementsFromStore)
  const model = REQUEST_MODEL
  model.uri = {
    containerCode: '',
    engagementId: itemChecked.id
  }

  const geoOptions = _.map(supportedVersionAndGeo[currentReleaseVersion] || [], (v) => { return { key: v, value: v, text: v } })
  const versionOptions = _.map(_.keys(supportedVersionAndGeo) || [], (v) => { return { key: v, value: v, text: v } })

  useEffect(() => {
    dispatch(getEngagementsByCurrentUserThunk({}))
    setShowEngagementDropdown(false)
    setShowBackPortfolio(false)
  }, [])

  useEffect(()=>{
    setListEngagements(listEngagementsFromStore)
  },[listEngagementsFromStore])

  const handleBegin = (data) => {
    setStatePortfolio({ type: actionType.TOGGLE_POPUP, payload: false })
    setStatePortfolio({ type: actionType.SET_CURRENT_STEP, payload: steps.stepTwoEC })
    setStatePortfolio({ type: actionType.SET_CURRENT_DATA, payload: data })
  }

  const handleBack = (data) => {
    setStatePortfolio({ type: actionType.TOGGLE_POPUP, payload: true })
    setStatePortfolio({ type: actionType.SET_CURRENT_DATA, payload: data })
    setStatePortfolio({ type: actionType.SET_CURRENT_STEP, payload: statePortfolio.currentStep - 1 })
  }

  const handleClose = () => {
    setStatePortfolio({ type: actionType.TOGGLE_POPUP, payload: false })
    setStatePortfolio({ type: actionType.SET_CURRENT_STEP, payload: steps.stepOneEC })
    setStatePortfolio({ type: actionType.SET_INIT_DATA, payload: {} })
  }

  const handleOnChangeRadioItem = (id) => {
    const checkedEng = listEngagementsFromStore.filter((eng) => {
      return eng.id === id
    })
    if (checkedEng.length > 0) {
      model.geoCode = checkedEng[0].geoCode
      model.uri.containerCode = checkedEng[0].containerCode
    }

    if (id === itemChecked.id && itemChecked.isChecked) {
      setItemChecked({ id, isChecked: false })
      setIsDisabled(true)
    }
    else {
      setItemChecked({ id, isChecked: true })
      setIsDisabled(false)
    }
  }

  const handleOptionChange = async (action) => {
    switch (action) {
      case actionDelType.submit:
        deletionEngagement(actionDelType.submit)
        break
      case actionDelType.approve:
        dispatch(openModal({
          className: 'approve-delete-modal',
          body: {
            content: intl.formatMessage(portfolioMessages.deleteEngagementContent)
          },
          leftBtn: {
            listBtn: [{
              className: 'secondary-btn',
              label: intl.formatMessage(portfolioMessages.cancelBtn),
              onClick: () => {
                dispatch(closeModal())
              }
            }]
          },
          rightBtn: {
            listBtn: [{
              className: 'primary-btn',
              label: intl.formatMessage(portfolioMessages.deleteBtn),
              onClick: () => deletionEngagement(actionDelType.approve)
            }]
          }
        }))
        break
      case actionDelType.reject:
        dispatch(openModal({
          className: 'reject-delete-modal',
          body: {
            content: intl.formatMessage(portfolioMessages.rejectEngagementContent)
          },
          leftBtn: {
            listBtn: [{
              className: 'secondary-btn',
              label: intl.formatMessage(portfolioMessages.cancelBtn),
              onClick: () => {
                dispatch(closeModal())
              }
            }]
          },
          rightBtn: {
            listBtn: [{
              className: 'primary-btn',
              label: intl.formatMessage(portfolioMessages.rejectBtn),
              onClick: () => deletionEngagement(actionDelType.reject)
            }]
          }
        }))
        break
    }
  }
  
  const deletionEngagement = async (action) => {
    let result = null
    dispatch(closeModal())
    dispatch(showLoading())
    switch (action) {
      case actionDelType.submit:
        result = unwrapResult(await dispatch(submitDeletedEngagementThunk(model)))
        break
      case actionDelType.approve:
        result = unwrapResult(await dispatch(approveDeletionThunk(model)))
        break
      case actionDelType.reject:
        result = unwrapResult(await dispatch(rejectDeletionThunk(model)))
        break
    }
    if (result.result.statusCode === 200) {
      dispatch(updateStatusDeletedEngagementList({ ...model.uri, status: result.result.data.engagementStatus }))
      handleOnChangeRadioItem(itemChecked.id)
    } else {
      dispatch(openErrorModal({ content: portfolioMessages.unsuccessfullyDel }))
    }
    dispatch(hideLoading())
  }

  const renderDropdown = (iconName, text, popupContent, options = [], style = {}) => {
    const trigger = <div className='trigger-name'>
      <Icon name={iconName} noWrapper={true} />
      <span>{text}</span>
    </div>

    const mainContent = <div className='default-dropdown hide'><Dropdown
      trigger={trigger}
      options={options}
      item
      button
      icon='angle down'
      onChange={null}
      disabled
    /></div>

    return <Popup position={'top center'} content={popupContent} trigger={mainContent} style={style} />
  }

  const { createEngagement } = creationPrompt
  
  const renderPortfolio = () => {
    return (
      <>
        <div className='portfolio'>
          <Container classes='portfolio__container'>
            <Header as='h1'>{portfolioMessages.portfolio}</Header>
            <div className='portfolio__actions'>
              <div>
                <Button className='primary-btn btn--create' onClick={() => setStatePortfolio({ type: actionType.TOGGLE_POPUP, payload: true })}>
                  <Image src={addCircleIcon} centered />
                  {createEngagement}
                </Button>
                <div className='default-dropdown'>
                  <DeleteEngagement
                    onChange={(e, { value }) => handleOptionChange(value)}
                    isDisabled={isDisabled}
                  />
                </div>
              </div>
              <div>
                {renderDropdown('globe', defaultGeo, portfolioMessages.geoPopup, geoOptions, { maxWidth: 255 })}
                {renderDropdown('desktop', SUPPORTED_VERSION[currentReleaseVersion], portfolioMessages.versionPopup, versionOptions)}
              </div>
            </div>
          </Container>
        </div>
        <div className='list-of-engagements'>
          <ListEngagement
            listEngagementsFromStore={listEngagements}
            itemChecked={itemChecked}
            portfolioMessages={portfolioMessages}
            configPagination={configPagination}
            handleOnChangeRadioItem={handleOnChangeRadioItem}
          />
        </div>
      </>
    )
  }

  const renderStep = (currentStep, openEngCreation) => {
    switch (currentStep) {
      case steps.stepOneEC:
        return (
          <>
            {renderPortfolio()}
            {openEngCreation == true && <CreateEngagement currentStep={currentStep} currentData={statePortfolio.currentData} onBegin={(data) => handleBegin(data)} onClose={() => handleClose()} />}
          </>
        )
      case steps.stepTwoEC:
        return (
          <CreateEngagement
            onBack={(data) => handleBack(data)}
            currentData={statePortfolio.currentData}
            onClose={() => handleClose()}
            currentStep={currentStep}
          />
        )
      default:
        return null
    }
  }
  return renderStep(statePortfolio.currentStep, statePortfolio.openEngCreation)
}

export default Portfolio