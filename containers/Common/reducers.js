import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toast: {
    position: '',
    autoCloseTime: '',
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnFocusLoss: false,
    pauseOnHover: false,
    limit: 1,
    content: '',
    isToast: false,
    newestOnTop: false,
    draggable: false,
    message: '',
    type: ''
  },
  loading: {
    active: false,
    size: 'large'
  },
  modal: {
    className: '',
    haveCloseIcon: true,
    isOpen: false,
    header: {
      className: '',
      content: ''
    },
    body: {
      content: '',
      className: ''
    },
    leftBtn: {
      className: '',
      listBtn: []
    },
    rightBtn: {
      className: '',
      listBtn: []
    },
  },
  errorModal: {
    className: '',
    open: false,
    content: '',
    header: null
  },
  signoutModal: {
    open: false
  }
}

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    showToastMessage: (state, action) => {
      state.toast = { ...state.toast, ...action.payload }
    },
    resetToastMessage: (state, action) => {
      state.toast.isToast = action.payload.isToast
    },
    openModal: (state, action) => {
      state.modal = { isOpen: true, ...action.payload }
    },
    closeModal: (state) => {
      state.modal = initialState.modal
    },
    showLoading: (state, { payload }) => {
      state.loading = { active: true, ...payload }
    },
    hideLoading: (state) => {
      state.loading.active = false
    },
    openErrorModal: (state, { payload }) => {
      state.errorModal = { open: true, ...payload }
    },
    closeErrorModal: (state) => {
      state.errorModal.content = ''
      state.errorModal.open = false
    },
    openSignoutModal: (state) => {
      state.signoutModal.open = true
    },
    closeSignoutModal: (state) => {
      state.signoutModal.open = false
    }
  }
})

const { reducer } = commonSlice
export default reducer