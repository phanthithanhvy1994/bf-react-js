/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'
import moment from 'moment'
import './styles.scss'
import { allTimeZonesSelector, updateAuthorizedInstitutionsThunk } from 'src/containers/Portfolio/Redux'
import { REQUEST_MODEL } from 'src/config/constants'
import { openErrorModal } from 'src/containers/common/actions'
import checked_circle_green from 'src/assets/Icons/svgs/checked_circle_green.svg'
import clockTime from 'src/assets/Icons/svgs/clock_time.svg'
import { Dimmer } from 'semantic-ui-react'
import { authorizedInstitutionsMessages, truncateSize, consentStatus, statusGuidance } from '../constants'
import { timeZoneMessages } from '../timeZoneConstants'
import {
  Header,
  Button,
  Dropdown,
  Popup,
  Image,
  Checkbox
} from 'src/components'
function InstitutionCard(props) {
  const intl = useIntl()
  const { authorizedInstitution, handleUpdateInstitutions, handleChecked } = props
  const dispatch = useDispatch()
  const { geoCode, engagementId } = useParams()
  const allTimeZones = useSelector(allTimeZonesSelector)
  const [filteredTimeZone, setFilteredTimeZone] = useState(allTimeZones)
  const [selectedTimeZoneId, setSelectedTimeZoneId] = useState(authorizedInstitution.timeZoneId)
  const [selectedTimeZoneOffset, setSelectedTimeZoneOffset] = useState()
  const [isActiveSaveButton, setIsActiveSaveButton] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuccessIcon, setShowSuccessIcon] = useState(false)
  useEffect(() => {
    const timeZone = filteredTimeZone.find(item => item.id === authorizedInstitution.timeZoneId)
    setSelectedTimeZoneOffset(timeZone?.offsetDisplay)
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showSuccessIcon) {
        setIsActiveSaveButton(false)
        setShowSuccessIcon(false)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [showSuccessIcon])
  const setDefaultDropdown = () => {
    setSearchQuery('')
    setFilteredTimeZone(allTimeZones)
  }
  const handleSelectTimezone = (timeZone) => {
    setIsOpen(false)
    setSelectedTimeZoneId(timeZone.id)
    setIsActiveSaveButton(timeZone.id !== authorizedInstitution.timeZoneId)
    setSelectedTimeZoneOffset(timeZone.offsetDisplay)
    setDefaultDropdown()
  }
  const handleSearch = (searchQueryData) => {
    const searchTimeZone = _.filter(
      allTimeZones,
      (x) =>
        !searchQueryData ||
        _.includes(_.toLower(x.defaultDisplayName), _.toLower(searchQueryData)),
    )
    setFilteredTimeZone(searchTimeZone)
    setSearchQuery(searchQueryData)
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
    setDefaultDropdown()
  }
  async function handleSaveButton(institutionId, clientId) {
    const { systemTimeZoneId } = _.find(
      allTimeZones,
      (x) => x.id === selectedTimeZoneId,
    )
    const payload = {
      engagementPlatformCountryInstitutionId: institutionId,
      clientId,
      timeZoneId: selectedTimeZoneId,
      sytemTimeZoneId: systemTimeZoneId,
    }
    const model = REQUEST_MODEL
    model.geoCode = geoCode
    model.uri = { engagementId }
    model.payload = payload
    try {
      const {
        result: { statusCode, data },
      } = unwrapResult(await dispatch(updateAuthorizedInstitutionsThunk(model)))
      if (statusCode === 200) {
        if (data.isSuccess) {
          handleUpdateInstitutions()
          setShowSuccessIcon(true)
        } else {
          dispatch(
            openErrorModal({
              className: 'authorized-institutions__modal',
              content: authorizedInstitutionsMessages.within24HourErrorContent,
              header: authorizedInstitutionsMessages.within24HourErrorHeader,
            }),
          )
        }
      } else {
        dispatch(
          openErrorModal({
            className: 'authorized-institutions__modal',
            content: authorizedInstitutionsMessages.contentErrorModal,
          }),
        )
      }
    } catch {
      handleUpdateInstitutions()
    }
  }
  const formatOffset = (offset) => {
    if (_.isNil(offset)) {
      return ''
    }
    const operator = offset.charAt(0)
    const baseUtcOffset = offset.substring(1)
    return `${operator} ${baseUtcOffset}`
  }
  const formatTimezoneDisplay = (timezone, translated) => (
    <span className='text'>
      {`(UTC${timezone.translationKey !== timeZoneMessages.utc.id
          ? ` ${formatOffset(timezone.offsetDisplay)}`
          : ''
        }) `}
      {translated?.value}
    </span>
  )
  if (authorizedInstitution !== null) {
    const selectedTimezone = selectedTimeZoneId ? _.find(allTimeZones, (x) => x.id === selectedTimeZoneId) : null
    const translatedSelectedTimezone = selectedTimezone && _.find(timeZoneMessages, (t) => t.id === selectedTimezone.translationKey)
    const dropdownText = selectedTimezone && formatTimezoneDisplay(selectedTimezone, translatedSelectedTimezone)
    const {
      institutionName,
      countryCode,
      id: authorizedinstitutionId,
      isValidAccessToken,
      engagementPlatformCountryInstitutionId,
      clientId
    } = authorizedInstitution
    let institutionDisplayInfo = `${institutionName} (${countryCode}), ${authorizedInstitution.clientName}`
    const timeZones = filteredTimeZone || allTimeZones
    // Checking Consents have been invalid
    const isConsentInValid = !isValidAccessToken && authorizedInstitution.consentStatus === consentStatus.inValid
    // Checking Consents have been expired
    const isConsentExpired = authorizedInstitution.consentStatus === consentStatus.expired
    const isDisabledInstitutions = isConsentExpired || authorizedInstitution.messagesType === statusGuidance.notReAuthen || !authorizedInstitution.timeZoneId || isConsentInValid
    // Checking Consents is Active and show the guidance
    var guidance = ''
    switch (authorizedInstitution.messagesType) {
      case statusGuidance.notReAuthen:
        guidance = authorizedInstitutionsMessages.noFutherReAuthenticate
        break
      case statusGuidance.canReAuthen:
        guidance = intl.formatMessage(authorizedInstitutionsMessages.lastDateReAuthenticate, {
          date: window.localize.toLocalDate(authorizedInstitution.reAuthenticationTime)
        })
        break
      default:
        break
    }
    if (isConsentInValid || isConsentExpired) guidance = authorizedInstitutionsMessages.noFutherReAuthenticate
    const convertUTCToTimezone = (time) => {
      let date = window.localize.toLocalDate(time)
      if (selectedTimeZoneOffset) {
        const dateTimeZone = moment.utc(time).utcOffset(selectedTimeZoneOffset).format('YYYY-MM-DD HH:mm:ss')
        date = window.localize.formatInputDate(dateTimeZone)
      }
      return date
    }
    return (
      <>
        <Dimmer.Dimmable
          className='dimmer-transparent'
          dimmed={showSuccessIcon}
        >
          <div className='card-institution'>
            <div className={`card-institution__header ${isDisabledInstitutions ? 'card-institution__header--disabled-reAuthen' : ''}`}>
              <Checkbox
                onChange={() => handleChecked(authorizedInstitution)}
                disabled={isDisabledInstitutions}
                checked={props?.listReAuthenticate?.some(item => item.id === authorizedInstitution.id)}
              />
              <Header as='h3'>{institutionDisplayInfo}</Header>
            </div>
            <div className='card-institution__content'>
              {<div className={`card-institution__content__block card-institution__content__block${!isConsentInValid ? `--re-authen ${isConsentExpired && 'expired'}` : '--invalid-token'}`}>
                <div className='consentId'>
                  <Image src={clockTime} />
                  {!isConsentInValid
                    ? (<p>{authorizedInstitutionsMessages.consentExpires} <span>&lt;{convertUTCToTimezone(authorizedInstitution.consentEnd)}&gt;{isConsentExpired && authorizedInstitutionsMessages.expired}</span></p>)
                    : (<p>{authorizedInstitutionsMessages.invalidAccessTokenInstitution}</p>)
                  }
                </div>
                <p className='guidance'>{guidance}</p>
              </div>}
              <div className='card-institution__content__block card-institution__content__block--time-zone'>
                <Dropdown
                  key={`timezone-${authorizedinstitutionId}`}
                  icon='chevron down'
                  className='selection'
                  search
                  open={isOpen}
                  searchQuery={searchQuery}
                  text={selectedTimezone && dropdownText}
                  placeholder={intl.formatMessage(authorizedInstitutionsMessages.selectLocalTimeZone)}
                  value={selectedTimezone && selectedTimezone.id}
                  onSearchChange={(e, data) => handleSearch(data.searchQuery)}
                  onOpen={() => handleOpen()}
                  onBlur={() => handleClose()}
                  onClick={() => handleClose()}
                  disabled={isConsentExpired || authorizedInstitution.messagesType === statusGuidance.notReAuthen}
                >
                  <Dropdown.Menu>
                    {timeZones && timeZones.length > 0 ? (
                      timeZones.map((x, index) => {
                        const isShowPopup = x.defaultDisplayName.length < truncateSize
                        const translatedTimezone = _.find(timeZoneMessages, (t) => t.id === x.translationKey)
                        const dropdownContent = formatTimezoneDisplay(x, translatedTimezone)
                        return (
                          <Popup
                            key={index}
                            className='card-institution-tooltip-name'
                            trigger={
                              <Dropdown.Item
                                key={`timezone-${authorizedinstitutionId}-${x.id}`}
                                content={dropdownContent}
                                value={x.id}
                                active={x.id === selectedTimeZoneId}
                                onClick={() => handleSelectTimezone(x)}
                              ></Dropdown.Item>
                            }
                            disabled={isShowPopup}
                            content={dropdownContent}
                            on='hover'
                            position='left center'
                            basic
                            offset={[0, 10]}
                          ></Popup>
                        )
                      })
                    ) : (
                      <Dropdown.Text
                        content={authorizedInstitutionsMessages.noTimeZoneFound}
                      />
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className='card-institution__content__block card-institution__content__block--save-btn'>
                <Button
                  className={isActiveSaveButton ? 'active' : 'disabled'}
                  type='submit'
                  onClick={() => handleSaveButton(engagementPlatformCountryInstitutionId, clientId)}
                >
                  {authorizedInstitutionsMessages.save}
                </Button>
              </div>
              <Dimmer active={showSuccessIcon}>
                <Image src={checked_circle_green} centered />
              </Dimmer>
            </div>
          </div>
        </Dimmer.Dimmable>
        <Dimmer
          className='authorized-institutions__page--dimmer'
          active={showSuccessIcon}
          page
        />
      </>
    )
  }
  return null
}
export default InstitutionCard
