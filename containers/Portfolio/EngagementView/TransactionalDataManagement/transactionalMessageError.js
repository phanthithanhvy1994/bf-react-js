import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { TransactionalDataManagementErrors, limitUploadTransactionalFileSize } from './constants'
import CloseIcon from 'src/assets/Icons/svgs/close_icon_red.svg'
import { Image } from 'src/components'
import messages from './messages'

const TransactionalMessageError = (props) => {
  const [uploadFailedMessagekey, setUploadFailedMessageKey] = useState('')
  const [insertFileName, setInsertFileName] = useState('')

  useEffect(() => {
    if (props.insertFileName && props.insertFileName !== '') {
      setInsertFileName(props.insertFileName)
    }
  }, [props.insertFileName])

  useEffect(() => {
    if (props && props.uploadFailed && props.uploadFailed !== 0) {
      const keyMessage = _.findKey(TransactionalDataManagementErrors, ['code', props.uploadFailed])
      setUploadFailedMessageKey(keyMessage)
    }
    else {
      setUploadFailedMessageKey('')
    }
  }, [props.uploadFailed])

  const handleClose = () => {
    if (props.setUploadFailed && typeof props.setUploadFailed === 'function') {
      props.setUploadFailed(0)
    }
  }

  return (
    <>
      {uploadFailedMessagekey && uploadFailedMessagekey !== '' && (
      <div className='upload-transactional__error'>
        <div className='upload-transactional__error_icon'>
          <span onClick={handleClose}><Image className='upload-transactional__error__icon_image' src={CloseIcon}
            alt={<FormattedMessage {...messages.errorClose} />} /></span>
        </div>
        <div className='upload-transactional__error_message'>
          <FormattedMessage {...TransactionalDataManagementErrors[uploadFailedMessagekey].message}
            values={{
              insertFileName: `${insertFileName}`,
              br: <br />,
              limitFileSize: limitUploadTransactionalFileSize || '',
              span: (...chunks) => <span>{chunks}</span>
            }} />
        </div>
      </div>)}
    </>

  )
}
export default TransactionalMessageError