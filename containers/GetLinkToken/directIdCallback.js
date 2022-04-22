import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Container, Image, Menu, Link, Modal, Button, Loader } from 'src/components'
import { routes } from 'src/config'
import { saveConsent } from './Redux/actions'
import Logo from 'src/assets/images/logos/logo_Project Name_GroupNameflow.svg'

import { REQUEST_MODEL } from 'src/config/constants'
import { warningMessage, MsgKey, buttonClose } from './constants'


function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

const DirectIdCallback = () => {
  let query = useQuery()
  const [isSuccessfullyAuthorized, setIsSuccessfullyAuthorized] = useState(false)
  const [isUnsuccessfullyAuthorized, setIsUnsuccessfullyAuthorized] = useState(false)
  const [isLinkExpired, setIsLinkExpired] = useState(false)
  const [isRequestDeleted, setIsRequestDeleted] = useState(false)
  const [isUnableConnectDirectId, setIsUnableConnectDirectId] = useState(false)
  const [isRequestAuthorized, setIsRequestAuthorized] = useState(false)
  const [isEngagementDeleted, setIsEngagementDeleted] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const { successfullyAuthorized, unSuccessfullyAuthorized, linkExpired, requestDeleted, engagementDeleted, unableConnectDirectId, requestAuthorized} = warningMessage

  const renderWarningMessageModal = (content) => {
    return <Modal className='error modal-authorized' open={true} onClose={onClose} >
      <div className='close-icon' onClick={onClose}></div>
      <div className='content'>{content}</div>
    </Modal>
  }

  const renderWarningMessageFailedModal = (content, customClass = '') => {
    const className = `error custom-warning-msg ${customClass ? customClass : ''}`
    return (
      <Modal className={className} open={true} onClose={onClose}>
        <div className="content">{content}</div>
        <Button className="secondary-btn btn--close" onClose={onClose}>
          {buttonClose}
        </Button>
      </Modal>
    )
  }

  const onClose = () => {
    window.close()
  }

  useEffect(() => {
    const validCallback = async () => {
      setIsChecking(true)
      const consentId = query.get('consent_id')
      const customerRef = query.get('customer_ref')
      const state = query.get('state')
      if (state === 'success' && customerRef) {
        const custRefArrays = customerRef.split('_')
        if (!_.isEmpty(custRefArrays)) {
          const params = {
            ...REQUEST_MODEL,
            geoCode: custRefArrays[0],
            query: {
              containerCode: custRefArrays[1],
              geoCode: custRefArrays[0]
            },
            payload: {
              consentId,
              EngagementInstitutionInvitationClientId: custRefArrays[2]
            }
          }

          const res = await saveConsent(params)
          if (res.result?.statusCode === 200) {
            const msg = _.get(res.result, 'data.status.message', '')
            if (msg) {
              switch (msg) {
                case MsgKey.linkExpire:
                  setIsLinkExpired(true)
                  break
                case MsgKey.requestDeleted:
                  setIsRequestDeleted(true)
                  break
                case MsgKey.unableConnectDirectId:
                  setIsUnableConnectDirectId(true)
                  break
                case MsgKey.requestAuthorized:
                  setIsRequestAuthorized(true)
                  break
                case MsgKey.engagementDeleted:
                  setIsEngagementDeleted(true)
                  break
              }
            } else {
              setIsSuccessfullyAuthorized(true)
            }
          } else {
            setIsUnsuccessfullyAuthorized(true)
          }
          setIsChecking(false)
        }
      } else {
        setIsUnsuccessfullyAuthorized(true)
        setIsChecking(false)
      }
    }

    validCallback()
  }, [])

  return (
    <div className='header-bf directId'>
      <Container>
        <Menu attached='top' tabular className='header-bf__menu'>
          <Menu.Item className='header-bf__item-logo'>
            <Link href={routes.index}>
              <Image className='header-bf__logo-Project Name' src={Logo} alt='Project Name GroupNameFlow' />
            </Link>
          </Menu.Item>
        </Menu>
      </Container>
      {isChecking && <Loader size='large' active />}
      {isLinkExpired && renderWarningMessageFailedModal(linkExpired, 'link-expired')}
      {isRequestDeleted && renderWarningMessageFailedModal(requestDeleted, 'request-deleted')}
      {isEngagementDeleted && renderWarningMessageFailedModal(engagementDeleted, 'engagement-deleted')}
      {isUnableConnectDirectId && renderWarningMessageFailedModal(unableConnectDirectId, 'unable-connect-vendor')}
      {isRequestAuthorized && renderWarningMessageFailedModal(requestAuthorized, 'request-authorized')}
      {isSuccessfullyAuthorized && renderWarningMessageModal(successfullyAuthorized)}
      {isUnsuccessfullyAuthorized && renderWarningMessageModal(unSuccessfullyAuthorized)}
    </div>
  )
}

export default DirectIdCallback
