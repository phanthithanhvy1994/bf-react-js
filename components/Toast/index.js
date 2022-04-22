import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

function Toastify(props) {
  const { content, onClose, isClearWaitingQueue, ...extantProps } = props

  toast(content, { onClose })
  isClearWaitingQueue && toast.clearWaitingQueue()

  return (
    <ToastContainer {...extantProps} />
  )
}

Toastify.propTypes = {
  onClose: PropTypes.func,
  content: PropTypes.any,
  isClearWaitingQueue: PropTypes.bool,
  position: PropTypes.string,
  autoClose: PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
  closeButton: PropTypes.oneOfType([PropTypes.bool,PropTypes.node]),
  transition: PropTypes.node,
  hideProgressBar: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  pauseOnFocusLoss: PropTypes.bool,
  rtl: PropTypes.bool,
  closeOnClick: PropTypes.bool,
  newestOnTop: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  toastClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  progressClassName: PropTypes.string,
  progressStyle: PropTypes.object,
  draggable: PropTypes.bool,
  draggablePercent: PropTypes.number,
  draggableDirection: PropTypes.oneOf(['x','y']),
  enableMultiContainer: PropTypes.bool,
  containerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  limit: PropTypes.number,
  role: PropTypes.string
}

export default Toastify