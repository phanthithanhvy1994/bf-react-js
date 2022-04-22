import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import './styles.scss'

const DirectIdConnect = ({ userLink }) => {
  const { clientId, hostUiUrl, providerId } = userLink
  const { engagementInstitutionInvitationClientId, geoCode, container } = useParams()
  const [isOpenLink, setIsOpenLink] = useState(false)
  const [directIdConnectLink, setDirectIdConnectLink] = useState('')

  useEffect(() => {
    const getDirectIdConnect = () => {
      let params = {}
      let url = new URL(hostUiUrl)
      if (userLink.isReAuth) {
        params = { consent_id: userLink.consentId, access_token: userLink.accessToken }
        url.href += `?consent_id=${userLink.consentId}#access_token=${userLink.accessToken}`
      } else {
        params = { client_id: clientId, customer_ref: `${geoCode.toUpperCase()}_${container.toUpperCase()}_${engagementInstitutionInvitationClientId}`, provider_id: providerId }
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      }
      setDirectIdConnectLink(url.toString())
      setIsOpenLink(true)
    }

    if (!isOpenLink) {
      getDirectIdConnect()
    }
  }, [])

  const openDirectIdConnect = () => {
    if (isOpenLink) {
      window.open(directIdConnectLink, '_self')
    }
  }

  return(
    <>
      {isOpenLink && openDirectIdConnect()}
    </>
  )
}

export default DirectIdConnect
