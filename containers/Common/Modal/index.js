import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { closeModal } from '../actions'
import { modalInfoSelector } from '../selectors'
import { AMOUNT_TIME } from './constants'
import { ConfirmModal } from 'src/components'

import './styles.scss'

function BasicModal() {
  const dispatch = useDispatch()
  const modalInfo = useSelector(modalInfoSelector)

  useEffect(() => {
    if (!!modalInfo.autoTurnOff) {
      setTimeout(() => { dispatch(closeModal()) }, AMOUNT_TIME)
    }
  }, [modalInfo.autoTurnOff])

  const handleCloseModal = () => {
    _.isFunction(modalInfo.onClose) && modalInfo.onClose()
    dispatch(closeModal())
  }
  
  return <ConfirmModal open={modalInfo.isOpen}
    onModalClose={handleCloseModal}
    onClose={_.get(modalInfo, 'leftBtn.listBtn[0].onClick')}
    onConfirm={_.get(modalInfo, 'rightBtn.listBtn[0].onClick')}
    modalClassName={`basic-model ${modalInfo?.className || ''}`}
    closeIcon={modalInfo.haveCloseIcon}
    closeOnDimmerClick={_.get(modalInfo, 'closeOnDimmerClick', true)}
    header={_.get(modalInfo, 'header.content')}
    content={_.get(modalInfo, 'body.content')}
    cancelBtn={_.get(modalInfo, 'leftBtn.listBtn[0].label')}
    confirmBtn={_.get(modalInfo, 'rightBtn.listBtn[0].label')}
  />
}

export default BasicModal