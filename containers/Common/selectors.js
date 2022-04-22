const loadingSelector = (state) => state.common.loading
const modalInfoSelector = (state) => state.common.modal
const toastInfoSelector = (state) => state.common.toast
const errorModalSelector = (state) => state.common.errorModal
const signoutModalSelector = (state) => state.common.signoutModal

export {
  loadingSelector,
  modalInfoSelector,
  toastInfoSelector,
  errorModalSelector,
  signoutModalSelector
}