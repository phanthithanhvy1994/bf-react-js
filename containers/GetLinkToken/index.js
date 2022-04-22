import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import DirectIdConnect from './directIdConnect'
import { Container, Image, Menu, Link, Button, Modal } from 'src/components'
import { routes } from 'src/config'
import { warningMessage, buttonClose, MsgKey, GroupNameDataPlatform } from './constants'
import { generateLinkToken, verifyLinkConnect } from './Redux/actions'
import Logo from 'src/assets/images/logos/logo_Project Name_GroupNameflow.svg'

import { REQUEST_MODEL } from 'src/config/constants'

const GetLinkToken = (props) => {
  const [userLink, setUserLink] = useState()
  const [isLinkExpired, setIsLinkExpired] = useState(false)
  const [isRequestDeleted, setIsRequestDeleted] = useState(false)
  const [isEngagementDeleted, setIsEngagementDeleted] = useState(false)
  const [isUnableConnectDirectId, setIsUnableConnectDirectId] = useState(false)
  const [isRequestAuthorized, setIsRequestAuthorized] = useState(false)

  const { linkExpired, requestDeleted, engagementDeleted, unableConnectDirectId, requestAuthorized } = warningMessage
  const { geoCode, container, platform } = useParams()

  useEffect(async () => {
    const params = REQUEST_MODEL
    params.query = {
      verify: _.get(props, 'match.params.verify', ''),
      version: _.get(props, 'match.params.keyversion', ''),
      containerId: _.get(props, 'match.params.containerId', ''),
      engagementInstitutionInvitationClientId: _.get(props, 'match.params.engagementInstitutionInvitationClientId', '')
    }
    if (geoCode)
      params.geoCode = geoCode.toUpperCase()
    if (container)
      params.uri = { container: container.toUpperCase() }
    
    let response = {}
    if (platform === GroupNameDataPlatform.directId) {
      response = await verifyLinkConnect(params)
    }
    
    if (response && response.result.statusCode == 200) {
      const msg = _.get(response.result, 'data.status.message', '')
      if (msg) {
        switch (msg) {
          case MsgKey.linkExpire:
            setIsLinkExpired(true)
            break
          case MsgKey.requestDeleted:
            setIsRequestDeleted(true)
            break
          case MsgKey.engagementDeleted:
            setIsEngagementDeleted(true)
            break
          case MsgKey.requestAuthorized:
            setIsRequestAuthorized(true)
            break
          case MsgKey.unableConnectDirectId:
            setIsUnableConnectDirectId(true)
            break
        }
      } else {
        setUserLink(_.get(response.result, 'data.data', ''))
      }
    }
  }, [])

  const renderWarningMessageModal = (content, customClass = '') => {
    const className = `error custom-warning-msg ${customClass ? customClass : ''}`
    return <Modal className={className} open={true} onClose={onClose} >
      <div className='content'>{content}</div>
      <Button className='secondary-btn btn--close' onClick={onClose}>{buttonClose}</Button>
    </Modal>
  }

  const onClose = () => {
    window.close()
  }

  return (
    <div className='header-bf'>
      <Container>
        <Menu attached='top' tabular className='header-bf__menu'>
          <Menu.Item className='header-bf__item-logo'>
            <Link href={routes.index}>
              <Image className='header-bf__logo-Project Name' src={Logo} alt='Project Name GroupNameFlow' />
            </Link>
          </Menu.Item>
        </Menu>
      </Container>
      {isLinkExpired && renderWarningMessageModal(linkExpired, 'link-expired')}
      {isRequestDeleted && renderWarningMessageModal(requestDeleted, 'request-deleted')}
      {isEngagementDeleted && renderWarningMessageModal(engagementDeleted, 'engagement-deleted')}
      {isUnableConnectDirectId && renderWarningMessageModal(unableConnectDirectId, 'unable-connect-vendor')}
      {isRequestAuthorized && renderWarningMessageModal(requestAuthorized, 'request-authorized')}
      {userLink !== undefined && platform === GroupNameDataPlatform.directId && <DirectIdConnect userLink={userLink} />}
    </div>
  )
}

export default GetLinkToken