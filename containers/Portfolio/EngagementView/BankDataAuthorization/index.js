import React, { useEffect, useMemo, useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { Container, Button, Image, SingleTable } from 'src/components'
import EngagementViewNav from 'src/containers/Portfolio/EngagementView/EngagementViewNav'
import { getCurrentEngagementByIdThunk, currentEngagementSelector, sortRecentEngagements, listEngagementsSelector } from 'src/containers/Portfolio/Redux'
import { openErrorModal, openModal, closeModal, showLoading, hideLoading } from 'src/containers/Common/actions'
import { REQUEST_MODEL } from 'src/config/constants'
import addCircleIcon from 'src/assets/icons/svgs/add_circle_icon.svg'
import illustPortfolioView from 'src/assets/icons/svgs/illustportfolioview.svg'

import { Authorization, columnsDetail, columnsCollapChild, headerTable, MODE } from './constants'
import { getPlatformCountriesThunk } from './Redux'
import { getListBDA, resendAuthorizationRequest, getLimitResend, deleteAuthorizationRequest } from './services'
import CreateRequestModal from './CreateRequestModal'
import ViewResendBDARequest from './ViewResendBDARequest'
import './styles.scss'

const GroupNameDataAuthorization = () => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const currentEngagement = useSelector(currentEngagementSelector)
  const listEngagements = useSelector(listEngagementsSelector)
  const [listIdSelected, setListIdSelected] = useState([])
  const [isCreated, setIsCreated] = useState(false)
  const [listOfBDAs, setListOfBDAs] = useState(null)
  const [viewResendBDARequest, setViewResendBDARequest] = useState({
    isOpen: false,
    BDAData: {},
    mode: '',
    onClose: () => resetViewResendBDARequest(),
    getBDAList: (model) => getBDAList(model, true)
  })
  const { engagementId, geoCode, containerCode } = useParams()
  const model = REQUEST_MODEL
  model.uri = { engagementId, containerCode }
  model.geoCode = geoCode
  useEffect(() => {
    dispatch(getCurrentEngagementByIdThunk(model))
    dispatch(getPlatformCountriesThunk(model))
    getBDAList(model)
  }, [])

  useEffect(() => {
    dispatch(sortRecentEngagements({ engagementId }))
  }, [listEngagements.length])

  const getBDAList = async (model, resetCheckedlist = false) => {
    dispatch(showLoading())
    const { result } = await getListBDA(model)
    setListOfBDAs(result?.data?.requests)
    if (resetCheckedlist) setListIdSelected([])
    dispatch(hideLoading())
  }

  const resetViewResendBDARequest = () => {
    setViewResendBDARequest({ ...viewResendBDARequest, isOpen: false, BDAData: {}, mode: '' })
  }

  const handleResendAll = async (rowData) => {
    dispatch(closeModal())
    dispatch(showLoading())
    model.payload = {
      id: rowData.id,
      resendAll: true,
    }

    const res = await resendAuthorizationRequest(model)
    if (res?.result?.statusCode === 200) {
      dispatch(openModal({
        className: 'sent-modal',
        haveCloseIcon: true,
        autoTurnOff: true,
        body: {
          content: intl.formatMessage(Authorization.sendSuccess)
        }
      }))
      model.payload = {}
      await getBDAList(model, true)
    }
    dispatch(hideLoading())
  }

  const handleResendRequest = async (rowData) => {
    model.query = { engagementInvitationClientId: rowData.id }
    const res = await getLimitResend(model)
    const isLock = _.get(res, 'result.data.isLock')
    const statusCode = _.get(res, 'result.statusCode')
    if (statusCode === 403) {
      dispatch(openErrorModal({ content: Authorization.sendErrorByEngagementDeleted }))
      return
    }
    const isValidRequest = _.get(res, 'result.data.isValidRequest')
    if (!isValidRequest) {
      dispatch(openErrorModal({ content: Authorization.SendErrorByEngagementEdited }))
      return;
    }
    if (isLock) {
      dispatch(openModal({
        className: 'limit-modal',
        header: {
          content: intl.formatMessage(Authorization.limitModalHeader)
        },
        body: {
          content: intl.formatMessage(Authorization.limitModalContent),
        },
        leftBtn: {
          listBtn: [{
            className: 'secondary-btn',
            label: intl.formatMessage(Authorization.closeBtn),
            onClick: () => {
              dispatch(closeModal())
            }
          }]
        },
      }))
    } else {
      const isLockBDAAuthorization = _.get(res, 'result.data.isLockBDAAuthorization')
      if (isLockBDAAuthorization) {
        setViewResendBDARequest({ ...viewResendBDARequest, isOpen: true, BDAData: { ...rowData }, mode: MODE.VIEW })
      } else {
        dispatch(openModal({
          className: 'resend-modal',
          body: {
            content: intl.formatMessage(Authorization.resendModalContent)
          },
          leftBtn: {
            listBtn: [{
              className: 'secondary-btn',
              label: intl.formatMessage(Authorization.noBtn),
              onClick: () => handleResendAll(rowData)
            }]
          },
          rightBtn: {
            listBtn: [{
              className: 'primary-btn',
              label: intl.formatMessage(Authorization.yesBtn),
              onClick: async () => {
                await handleBeforeEditRequest(rowData)
              }
            }]
          }
        }))
      }
    }
  }

  const handleBeforeEditRequest = async (rowData) => {
    const res = await getLimitResend(model)
    const statusCodeLock = _.get(res, 'result.statusCode')
    if (statusCodeLock === 403) {
      dispatch(openErrorModal({ content: Authorization.sendErrorByEngagementDeleted }))
      return
    }
    const isValidRequest = _.get(res, 'result.data.isValidRequest')
    if (!isValidRequest) {
      dispatch(openErrorModal({ content: Authorization.SendErrorByEngagementEdited }))
    } else {
      const isLockBDAAuthorization = _.get(res, 'result.data.isLockBDAAuthorization')
      setViewResendBDARequest({ ...viewResendBDARequest, isOpen: true, BDAData: { ...rowData }, mode: isLockBDAAuthorization ? MODE.VIEW : MODE.EDIT })
    }
    dispatch(closeModal())
  }

  const onCheckboxChange = (e, rowSelected) => {
    if (rowSelected.checked) {
      setListIdSelected(pervious => [...pervious, rowSelected.value])
    } else {
      setListIdSelected(pervious => pervious.filter(idSelected => idSelected !== rowSelected.value))
    }
  }

  const deleteBDARequest = async () => {
    dispatch(showLoading())
    const deleteModel = REQUEST_MODEL
    deleteModel.uri = { engagementId, containerCode }
    deleteModel.payload = { requestIds: listIdSelected }
    deleteModel.geoCode = geoCode
    const res = await deleteAuthorizationRequest(deleteModel)
    const statusCode = _.get(res, 'result.statusCode')

    if (statusCode === 200) {
      const newListBDA = listOfBDAs?.filter(BDARequest => !listIdSelected.includes(BDARequest.id)) || []
      setListOfBDAs(newListBDA)
      setListIdSelected([])
    }
    else if (statusCode === 403) {
      dispatch(openErrorModal({ content: Authorization.sendErrorByEngagementDeleted }))
    }
    dispatch(closeModal())
    dispatch(hideLoading())
  }

  const handleDeleteRequest = () => {
    dispatch(openModal({
      className: 'delete-modal',
      body: {
        content: intl.formatMessage(Authorization.deleteModalBodyContent),
      },
      leftBtn: {
        listBtn: [{
          className: 'secondary-btn',
          label: intl.formatMessage(Authorization.buttonCancel),
          onClick: () => {
            dispatch(closeModal())
          }
        }]
      },
      rightBtn: {
        listBtn: [{
          className: 'primary-btn',
          label: intl.formatMessage(Authorization.buttonDelete),
          onClick: () => deleteBDARequest()
        }]
      }
    }))
  }

  const handleViewRequest = (props) => {
    setViewResendBDARequest({ ...viewResendBDARequest, isOpen: true, BDAData: {...props}, mode: MODE.VIEW })
  }

  const handleCloseRequestModal = (refresh = false) => {
    if (refresh) {
      getBDAList(model)
    }
    setIsCreated(false)
  }

  const renderRowData = (record) => {
    return columnsDetail(onCheckboxChange, handleResendRequest, handleViewRequest, record)
  }

  const renderListOfAuthorization = useMemo(() => {
    if (!!listOfBDAs?.length) {
      return (
        <SingleTable
          headerTable={headerTable}
          listData={listOfBDAs}
          renderRowData={renderRowData}
          classes='primary-table'
          columnsCollapChild={columnsCollapChild}
        />
      )
    } else if (listOfBDAs?.length == 0) {
      return (
        <div className='no-requests'>
          <Image src={illustPortfolioView} alt='illustPortfolioView' centered />
          <div className='div--centered'>{Authorization.emptyRequests}</div>
        </div>
      )
    }
  }, [listOfBDAs])

  const renderAuthorization = () => {
    return (
      <>
        <div className='authorization'>
          <Container classes='authorization__container'>
            <Grid columns='equal'>
              <Grid.Row>
                <Grid.Column>
                  <Button className='primary-btn btn--create' onClick={() => setIsCreated(true)}>
                    <Image src={addCircleIcon} />
                    {Authorization.createRequest}
                  </Button>
                  <Button disabled={listIdSelected.length < 1} className='btn--delete' onClick={handleDeleteRequest}>{Authorization.deleteBtn}</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
        <div className='list-of-authorization'>
          <Container classes='list-of-authorization__container'>
            <Grid columns='equal'>
              <Grid.Column>
                {renderListOfAuthorization}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </>
    )
  }

  return (
    !_.isEmpty(currentEngagement) &&
    <>
      <EngagementViewNav />
      <div className='detail'>
        <Container classes='detail__container'>
          <Grid columns='equal'>
            <Grid.Column>
              {renderAuthorization()}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      {viewResendBDARequest.isOpen && <ViewResendBDARequest {...viewResendBDARequest} />}
      {isCreated && <CreateRequestModal listOfBDAs={listOfBDAs} onClose={(refresh) => handleCloseRequestModal(refresh)} />}
    </>
  )
}

export default GroupNameDataAuthorization
