import { createAction } from "@reduxjs/toolkit"

const showToastMessage = createAction('common/showToastMessage')
const resetToastAction = createAction('common/resetToastMessage')
const openModal = createAction('common/openModal')
const closeModal = createAction('common/closeModal')
const showLoading = createAction('common/showLoading')
const hideLoading = createAction('common/hideLoading')
const openErrorModal = createAction('common/openErrorModal')
const closeErrorModal = createAction('common/closeErrorModal')
const openSignoutModal = createAction('common/openSignoutModal')
const closeSignoutModal = createAction('common/closeSignoutModal')

export {
  showToastMessage,
  resetToastAction,
  openModal,
  closeModal,
  showLoading,
  hideLoading,
  openErrorModal,
  closeErrorModal,
  openSignoutModal,
  closeSignoutModal
}