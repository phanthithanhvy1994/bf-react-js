import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { Grid } from 'semantic-ui-react'
import { unwrapResult } from '@reduxjs/toolkit'
import './styles.scss'
import { Container, Image, Button } from 'src/components'
import EngagementViewNav from 'src/containers/Portfolio/EngagementView/EngagementViewNav'
import { REQUEST_MODEL } from 'src/config/constants'
import {
  getAuthorizedInstitionByEngagementThunk,
  getAllTimeZonesThunk,
  getCurrentEngagementByIdThunk
} from 'src/containers/Portfolio/Redux'
import illustPortfolioView from 'src/assets/icons/svgs/illustportfolioview.svg'
import CardInstitution from './CardInstitution'
import AuthorizedInstitutionsHeader from './authorizedInstitutionHeader'
import { authorizedInstitutionsMessages, messageTeamMember, messageReAuthenticate } from './constants'
import { engagementOwnerCode } from 'src/config/constants'
import { openModal, closeModal, showLoading, hideLoading } from 'src/containers/Common/actions'
import { reAuthenticate } from './services'
import { getTeamMgmtListService } from 'src/containers/Portfolio/EngagementView/TeamManagement/services'

function AuthorizedInstitutions() {
  const intl = useIntl()
  const { currentUser } = useSelector((state) => state.account)
  const [listInstitutions, setListInstitutions] = useState([])
  const [fetched, setFetched] = useState(false)
  const [isDisabledReAuthenticate, setIsDisabledReAuthenticate] = useState(true)
  const [listReAuthenticate, setListReAuthenticate] = useState([])
  const dispatch = useDispatch()
  const { engagementId, geoCode, containerCode } = useParams()
  const model = {
    ...REQUEST_MODEL,
    uri: { engagementId, containerCode },
    geoCode
  }

  useEffect(async () => {
    dispatch(getCurrentEngagementByIdThunk(model))
    dispatch(getAllTimeZonesThunk(model))
    await getInstitutionData()
  },[])

  const getInstitutionData = async () => {
    const institutionResult = await dispatch(getAuthorizedInstitionByEngagementThunk(model))
    const { result: { data: institutions } } = unwrapResult(institutionResult)

    if (!_.isEmpty(institutions)) {
      institutions && setListInstitutions(_.orderBy(institutions, [
                                                  x => x.institutionName.toLowerCase(), 
                                                  x => x.countryCode.toLowerCase(),
                                                  x => x.clientName.toLowerCase()]))
    } else {
      setListInstitutions([])
    }
    setFetched(true)
  }

  const handleUpdateInstitutions = async () => {
    await getInstitutionData()
  }

  const handleReAuthenticate = async () => {
    let isEngagementOwner = false

    const { result } = await getTeamMgmtListService(model)
    if (result?.statusCode === 200 && result?.data?.teamMemberInfos && currentUser?.user?.userId) {
      const member = result.data.teamMemberInfos.find(x => x.id === currentUser.user.userId)
      if (member?.roleId === engagementOwnerCode) {
        isEngagementOwner = true
      }
    }

    if (isEngagementOwner) {
      return listReAuthenticate.length > 0 && warningMessageReAuthenticate(listReAuthenticate)
    } else {
      return warningMessageTeamMember()
    }
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
    setListReAuthenticate([])
    setIsDisabledReAuthenticate(true)
  }

  const warningMessageTeamMember = () => {
    dispatch(openModal({
      className: 'warning-message-team-member',
      header: {
        content: intl.formatMessage(messageTeamMember.header)
      },
      body: {
        content: intl.formatMessage(messageTeamMember.body)
      },
      leftBtn: {
        listBtn: [{
          className: '',
          label: intl.formatMessage(authorizedInstitutionsMessages.btnClose),
          onClick: handleCloseModal
        }]
      }
    }))
  }

  const warningMessageReAuthenticate = (listReAuthenticate) => {
    dispatch(openModal({
      className: 'warning-message-re-authenticate',
      header: {
        content: intl.formatMessage(messageReAuthenticate.header)
      },
      body: {
        content: intl.formatMessage(messageReAuthenticate.body, {
          listGroupNameName: (
            <ul>
              {listReAuthenticate.map((val, idx) => (
                <li className='item-GroupName' key={idx}>{val.institutionName} ({val.countryCode}), {val.clientName}</li>
              ))}
            </ul>
          )
        })
      },
      leftBtn: {
        listBtn: [{
          className: '',
          label: intl.formatMessage(authorizedInstitutionsMessages.btnCancel),
          onClick: () => {
            dispatch(closeModal())
          }
        }]
      },
      rightBtn: {
        listBtn: [{
          className: 'primary-btn',
          label: intl.formatMessage(authorizedInstitutionsMessages.btnYes),
          onClick: () => {
            let ids = []
            listReAuthenticate.map((val) => (
              ids.push(val.id)
            ))
            handleSendMail(ids)
          }
        }]
      }
    }))
  }

  const handleSendMail = async (ids) => {
    dispatch(closeModal())
    dispatch(showLoading())
    model.payload = {
      engagementInstitutionClientIds: ids
    }
    const res = await reAuthenticate(model)
    if (_.get(res, 'result.statusCode') == 200) {
      await getInstitutionData()
      setListReAuthenticate([])
      setIsDisabledReAuthenticate(true)
    }
    dispatch(hideLoading())
  }

  const handleChecked = (data) => {
    const reListAuthen = [...listReAuthenticate]
    const index = reListAuthen.findIndex(el => el.id === data.id)
    if (reListAuthen.includes(data)) {
      reListAuthen.splice(index, 1)
    } else {
      reListAuthen.push(data)
    }
    if (reListAuthen.length > 0) {
      setIsDisabledReAuthenticate(false)
    } else {
      setIsDisabledReAuthenticate(true)
    }
    setListReAuthenticate(reListAuthen)
  }

  const renderListOfAuthorizedInstitutions = useMemo(() => {
    if (listInstitutions.length > 0) {
      return (
        <>
          <div className='authorized-institutions__header'>
            <AuthorizedInstitutionsHeader />
            <div className='authorized-institutions__button'>
              <Button onClick={handleReAuthenticate} disabled={isDisabledReAuthenticate} className='primary-btn btn--reAuthenticate'>
                {authorizedInstitutionsMessages.reAuthenticate}
              </Button>
              <Button className='primary-btn btn--viewDetails'>
                {authorizedInstitutionsMessages.viewDetails}
              </Button>
            </div>
          </div>
          <>
            {listInstitutions.map((x) => (
              <CardInstitution
                key={`institution-${x.id}`}
                authorizedInstitution={x}
                handleChecked={handleChecked}
                listReAuthenticate={listReAuthenticate}
                handleUpdateInstitutions={handleUpdateInstitutions}
              />
            ))}
          </>
        </>
      )
    }
    if (fetched) {
      return (
        <>
          <Image
            className='empty-institution'
            src={illustPortfolioView}
            alt='illustPortfolioView'
            centered
          />
          <div className='div--centered'>
            {authorizedInstitutionsMessages.emptyInstitution}
          </div>
        </>
      )
    }
    return null
  }, [listReAuthenticate, isDisabledReAuthenticate, listInstitutions, fetched])

  const renderInstitutions = () => {
    return (
      <>
        <EngagementViewNav />
        <div className='authorized-institutions'>
          <Container>
            <Grid columns='equal'>
              <Grid.Column>{renderListOfAuthorizedInstitutions}</Grid.Column>
            </Grid>
          </Container>
        </div>
      </>
    )   
  }

  return renderInstitutions()
}

export default AuthorizedInstitutions
