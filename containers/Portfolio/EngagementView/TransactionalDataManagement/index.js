import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { generatePath } from 'react-router'
import { FormattedMessage } from 'react-intl'
import { Grid } from 'semantic-ui-react'
import { Container, Header } from 'src/components'
import { REQUEST_MODEL } from 'src/config/constants'
import EngagementViewNav from 'src/containers/Portfolio/EngagementView/EngagementViewNav'
import { getCurrentEngagementByIdThunk, currentEngagementSelector } from 'src/containers/Portfolio/Redux'
import TransactionalDataDetails from './TransactionalDataDetails'
import TransactionalButtons from './transactionalButtons'
import TransactionalProgress from './transactionalProgress'
import TransactionalDropzone from './transactionalDropzone'
import TransactionalMessageError from './transactionalMessageError'
import TransactionalGetFile from './transactionalGetFile'
import { TransactionDataFileStatus, TransactionalDataFileTemplateName } from './constants'
import { getTransactionalDataFileTemplate } from './services'
import { openModal, closeModal } from 'src/containers/Common/actions'
import { routes } from 'src/config'
import { engagementSettingsMessages } from 'src/containers/Setting/EngagementSettings/constants'
import messages from './messages'

import './styles.scss'

const TransactionalDataManagement = () => {
  const dispatch = useDispatch()
  const currentEngagement = useSelector(currentEngagementSelector)
  const history = useHistory()
  const isViewUpload = history.location.search.includes('isViewUpload=true')
  const [progressPercent, setProgressPercent] = useState(0)
  const [isUploaded, setIsUploaded] = useState(isViewUpload)
  const [isViewData, setIsViewData] = useState(isViewUpload)
  const [insertFileName, setInsertFileName] = useState('')
  const [isCancelUpload, setIsCancelUpload] = useState(false)
  const [isReplaceUpload, setIsReplaceUpload] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isCanCancelUpload, setIsCanCancelUpload] = useState(false)
  const [uploadFailed, setUploadFailed] = useState(0)
  const [transactionDataFileStatus, setTransactionDataFileStatus] = useState(TransactionDataFileStatus.fileCheckSuccess)
  const { engagementId, geoCode, containerCode } = useParams()
  const model = {
    ...REQUEST_MODEL,
    uri: { engagementId, containerCode },
    geoCode
  }

  useEffect(() => {
    history.listen((location) => {
      if(!location.search.includes('isViewUpload=true')) {
        setIsViewData(false)
      }
    })
  }, [])

  const showWarningPopup = () => {
    dispatch(openModal({
      className: 'off-matching-warning-modal',
      closeOnDimmerClick: false,
      header: {
        content: engagementSettingsMessages.offMatchingHeaderWarning
      },
      body: {
        content: engagementSettingsMessages.offMatchingContentWarning
      },
      rightBtn: {
        listBtn: [{
          className: 'primary-btn',
          label: engagementSettingsMessages.close,
          onClick: () => {
            window.location.href = generatePath(routes.portfolio.engagementView.GroupNameDataAuthorization, {
              geoCode,
              containerCode,
              engagementId
            })
            dispatch(closeModal())
          }
        }]
      }
    }))
  }

  useEffect(() => {
    if (isViewData) {
      history.push({
        search: 'isViewUpload=true'
      })
    } else {
      history.replace({
        search: ''
      })
    }
    dispatch(getCurrentEngagementByIdThunk(model))
  }, [isViewData])

  return (
    <>
      <EngagementViewNav />
      {_.get(currentEngagement, 'isEnableMatching') === false && showWarningPopup()}
      <Container classes='upload-transactional'>
        {!isViewData && (
          <>
            <Header as='h2'>
              <FormattedMessage {...messages.pageTitle} />
            </Header>
            <div className='upload-transactional__descriptions'>
              <TransactionalGetFile
                serviceApi={getTransactionalDataFileTemplate}
                messages={messages.descriptions}
                fileName={TransactionalDataFileTemplateName}
              />
            </div>
          </>)}
        <Grid columns='equal'>
          <Grid.Column>
            {!isViewData ?
              <TransactionalDropzone
                showWarningPopup={showWarningPopup}
                data={{ isCancelUpload, uploadFailed, isReplaceUpload, isPaused }}
                fn={{ setProgressPercent, setIsUploaded, setInsertFileName, setIsCancelUpload, setUploadFailed,
                  setTransactionDataFileStatus, setIsReplaceUpload, setIsCanCancelUpload }} />
              : <TransactionalDataDetails setIsViewData={setIsViewData} setInsertFileName={setInsertFileName} />}

            {progressPercent !== 0 && (
              <TransactionalProgress
                showWarningPopup={showWarningPopup}
                progressPercent={progressPercent}
                transactionDataFileStatus={transactionDataFileStatus}
                isCanCancelUpload={isCanCancelUpload}
                setIsCancelUpload={setIsCancelUpload}
                setIsPaused={setIsPaused} />)}

            {isUploaded && insertFileName !== '' && (
              <TransactionalButtons
                showWarningPopup={showWarningPopup}
                isViewData={isViewData}
                isReplaceUpload={isReplaceUpload}
                setIsViewData={setIsViewData}
                setIsReplaceUpload={setIsReplaceUpload} />)}

            {uploadFailed !== 0 && (
              <TransactionalMessageError
                uploadFailed={uploadFailed}
                insertFileName={insertFileName}
                setUploadFailed={setUploadFailed} />)}

          </Grid.Column>
        </Grid>
      </Container>
    </>
  )
}

export default TransactionalDataManagement
