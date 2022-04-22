import React, { useEffect, useState, useRef, useMemo } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Button, Form } from 'src/components'
import { REQUEST_MODEL } from 'src/config/constants'
import { routes } from 'src/config'
import { openErrorModal } from 'src/containers/common/actions'

import { getGlobalEmployeesByKeyword, getAADInfoByEmail, createUpdateTeamMember } from './services'
import SearchMember from './SearchMember'
import Error from './error'
import ListMember from './listMember'
import { manageTeamMessages, DEFAULT_SEARCH, OPM_ACTIVE_STATUS, VALIDATE_SEARCH } from './constants'
import { engagementOwnerCode } from 'src/config/constants'
import GuidanceTooltip from 'src/containers/Common/GuidanceTooltip'
import { getEngagementsByCurrentUserThunk } from 'src/containers/Portfolio/Redux'
import './styles.scss'

const ManageTeam = (props) => {
  const { formatMessage } = useIntl()
  const [teamSearchResult, setTeamSearchResult] = useState([])
  const { onClose, memberList, updateMemberSuccess, roleOptions } = props
  const [submitError, setSubmitError] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const childRef = useRef()
  const [isDeactivateYourself, setIsDeactivateYourself] = useState(false)
  const { engagementId, geoCode, containerCode } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const methods = useForm({
    mode: 'onTouched'
  })
  const { formState: { errors }, getValues, clearErrors, setError, watch } = methods
  const errorRoleRequired = _.get(errors, `listMember`, []).some(memberError => _.get(memberError, 'role.type') === 'required')
  const { listMemberActive, listMemberDeactivate } = useMemo(() => {
    let listMemberActive = []
    let listMemberDeactivate = []
    _.forEach(memberList, (member) => {
      if (member.isActive) {
        listMemberActive.push(member)
      } else {
        listMemberDeactivate.push(member)
      }
    })
    listMemberActive = _.sortBy(listMemberActive, ['role', 'firstName', 'lastName'])
    listMemberDeactivate = _.sortBy(listMemberDeactivate, ['name'])
    listMemberActive = _.map(listMemberActive, (member) => {
      return {
        roleId: member.roleId,
        deactivateMemberCheck: { checked: false, value: member }
      }
    })
    listMemberDeactivate = _.map(listMemberDeactivate, (member) => {
      return {
        roleId: member.roleId,
        deactivateMemberCheck: { checked: true, value: member }
      }
    })

    return {
      listMemberActive,
      listMemberDeactivate
    }
  }, [])

  useEffect(async () => {
    methods.reset({
      listMember: listMemberActive
    })
  }, [])

  const mapNameUser = (data) => {
    let result = ''
    if (!_.isEmpty(data) && data.lastName && data.firstName) {
      result = `${data.lastName}, ${data.firstName}`
      if (data.countryDesc) {
        result = result + `(${data.countryDesc})`
        if (data.officeDesc) {
          result = `${data.lastName}, ${data.firstName} (${data.countryDesc}-${data.officeDesc.split('-')[0]})`
          if (data.organizationDesc) {
            result = `${data.lastName}, ${data.firstName} (${data.countryDesc}-${data.officeDesc.split('-')[0]}-${data.organizationDesc})`
          }
        }
      }
    }
    return result
  }

  const handleSearchChange = async (value) => {
    const payload = { Keyword: value, Skip: DEFAULT_SEARCH.Skip, Top: DEFAULT_SEARCH.Top, KeywordComparator: DEFAULT_SEARCH.KeywordComparator }
    const { result } = await getGlobalEmployeesByKeyword(payload)

    if (!result || result.length < 1) return []
    let listMemberOPMActive = [], listOPMEmails = []

    _.forEach(result, user => {
      if (user.employeeStatusDesc === OPM_ACTIVE_STATUS) {
        listMemberOPMActive.push(user)
        listOPMEmails.push(user.email)
      }
    })
    //Check emails are active both OPM and AAD
    const listAADAccountEnabled = await getListAADAccountEnabledByEmails(listOPMEmails)
    let listMemberActive = []

    _.forEach(listAADAccountEnabled, (user) => {
      const member = listMemberOPMActive?.find(member => member.email.toLowerCase() === user.email.toLowerCase())
      if (member) {
        listMemberActive.push({ ...member, azureId: user.id })
      }
    })

    if (listMemberActive.length < 1) return []
    setTeamSearchResult(listMemberActive)
    const listMemberActiveSorted = _.sortBy(listMemberActive, ['lastName', 'firstName'])
    let memberFormatted = listMemberActiveSorted.map(member => {
      return {
        title: mapNameUser(member),
        job: member.jobTitle,
        email: member.email,
        value: member.azureId
      }
    })

    if (memberFormatted.length >= VALIDATE_SEARCH.maxResult) {
      memberFormatted = memberFormatted.slice(0, VALIDATE_SEARCH.maxResult)
      memberFormatted.push({
        title: '',
        value: '',
        moreresult: manageTeamMessages.showMoreResult
      })
    }

    return memberFormatted
  }

  const getListAADAccountEnabledByEmails = async (emails) => {
    const resultAAD = await getAADInfoByEmail({
      emails: emails,
      select: 'id,mail,accountEnabled'
    })

    if (!resultAAD) return []
    let listAADAccountEnabled = []
    _.forEach(resultAAD, user => {
      if (user.accountEnabled) {
        listAADAccountEnabled.push({ email: user.mail, id: user.id })
      }
    })

    return listAADAccountEnabled
  }

  const resultRenderer = (result) => {
    return !result?.moreresult ? (
      <div className='result-item'>
        <div className='result-item__title'>{result?.title || ''}</div>
        <div className='result-item__job'>{result?.job || ''}</div>
        <div className='result-item__email'>{result?.email || ''}</div>
      </div>
    ) : (
      <div className='result-item'>
        <div className='result-item__no-result'>{result.moreresult}</div>
      </div>
    )
  }

  const handleSubmit = async () => {
    if (isInValidEngagementOwner() || isSubmit) return
    const listEmailLeftFirm = await checkADDMemberHasLeftFirm()

    if (listEmailLeftFirm.length > 0) {
      return setError('search', {
        type: 'manual',
        message: formatMessage(manageTeamMessages.errorMemberLeftFirm, { emails: listEmailLeftFirm.join(', '), br: <br /> })
      })
    }

    clearErrors()
    setIsSubmit(true)
    const response = await updateTeamMember()
    const statusCode = _.get(response, 'result.statusCode')

    if (statusCode === 200) {
      onClose()

      if (isDeactivateYourself) {
        dispatch(getEngagementsByCurrentUserThunk({}))
        history.push(routes.portfolio.index)
      } else {
        updateMemberSuccess()
      }
    } else {
      dispatch(openErrorModal())
    }
    setIsSubmit(false)
  }

  const updateTeamMember = async () => {
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    const payload = _.map(getValues()?.listMember, data => {
      const isCheckDeactivate = _.get(data, 'deactivateMemberCheck.checked')
      const memberData = _.get(data, 'deactivateMemberCheck.value')
      const roleId = data.role
      const role = roleOptions.find(role => role.code === roleId)?.name

      return {
        id: memberData.azureId,
        email: memberData.email,
        firstName: memberData.firstName,
        lastName: memberData.lastName,
        jobTitle: memberData.jobTitle,
        countryCode: memberData.countryCode,
        countryDesc: memberData.countryDesc,
        officeCode: memberData.officeCode,
        officeDesc: memberData.officeDesc,
        organizationCode: memberData.organizationCode,
        organizationDesc: memberData.organizationDesc,
        phoneNumber: memberData.workPhone,
        locale: window.localize.getBrowserLocale() || window.localize.defaultLocale,
        language: window.localize.defaultLanguage,
        isUserExisted: !!memberData.isUserExisted,
        azureId: memberData.azureId,
        role,
        roleId,
        isActive: !isCheckDeactivate
      }
    })
    model.geoCode = geoCode
    model.payload = { memberList: payload }
    const result = await createUpdateTeamMember(model)

    return result
  }

  const checkADDMemberHasLeftFirm = async () => {
    const memberData = getValues()?.listMember
    let activeMembers = []

    _.forEach(memberData, (member) => {
      if (!member.deactivateMemberCheck.checked) {
        const memberValues = _.get(member, 'deactivateMemberCheck.value')

        if (!_.isEmpty(memberValues)) {
          activeMembers.push({
            email: memberValues.email,
            id: memberValues.azureId,
            firstName: memberValues.firstName,
            lastName: memberValues.lastName
          })
        }
      }
    })
    if (activeMembers.length < 0) return []

    const listEmails = activeMembers.map(member => member.email)
    const listAADAccountEnabled = await getListAADAccountEnabledByEmails(listEmails)
    const listLeftFirm = _.filter(activeMembers, (member) => {
      const hasActiveInAAD = listAADAccountEnabled.some(account => account.id === member.id)
      return !hasActiveInAAD
    })
    const listLeftFirmSorted = _.sortBy(listLeftFirm, ['firstName', 'lastName'])

    return listLeftFirmSorted.map(member => member.email) || []
  }

  const validateSearchValue = (value) => {
    if (value?.length < VALIDATE_SEARCH.minLength && value?.length > 0) {
      methods.setError('search', {
        type: 'common',
        message: manageTeamMessages.minCharacters
      })
      return false
    }
    if (value?.length > VALIDATE_SEARCH.maxLength) {
      methods.setError('search', {
        type: 'common',
        message: manageTeamMessages.noResult
      })
      return false
    }

    methods.clearErrors('search')
    return true
  }

  useEffect(() => {
    if (submitError) {
      const listMemberRole = _.filter(getValues()?.listMember, (member) => !member.deactivateMemberCheck.checked, []).map(member => member.role)
      if (listMemberRole.includes(engagementOwnerCode)) {
        setSubmitError('')
      }
    }
  }, [watch('listMember')])

  const isInValidEngagementOwner = () => {
    let errorMess = ''
    const listMemberRole = _.filter(getValues()?.listMember, (member) => !member.deactivateMemberCheck.checked, []).map(member => member.role)

    if (!listMemberRole.includes(engagementOwnerCode)) {
      errorMess = manageTeamMessages.mustBeEngagementOwnerAssigned
    }

    setSubmitError(errorMess)
    return errorMess
  }

  const handleAddMember = (result) => {
    childRef.current.handleAddMember(result)
  }

  return (
    <div className='manage-team-modal'>
      <div className='manage-team-modal__header'>{manageTeamMessages.manageTeam}</div>
      <div className='manage-team-modal__content'>
        <FormProvider {...methods} >
          <Form id='mange-team' onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className='default-dropdown manage-team-modal__search-input'>
              <div className='default-dropdown manage-team-modal__search-input-title'>
                <label>{manageTeamMessages.addTeamMemberBtn}</label>
                <GuidanceTooltip className='team-member'/>
              </div>
              <SearchMember
                name='search'
                handleSearchChange={handleSearchChange}
                resultRenderer={resultRenderer}
                useTypingSearch={false}
                placeholder={manageTeamMessages.searchTeamMember}
                noResultsDescription={manageTeamMessages.noResult}
                validateSearchValue={validateSearchValue}
                handleResultSelected={handleAddMember}
              />
            </div>
            {_.get(errors, `search.type`) === 'manual' && <Error message={_.get(errors, `search.message`)} />}
            <div className='manage-team-modal__deactivate-title'>
              {formatMessage(manageTeamMessages.deactivateText)}
            </div>
            <div className='manage-team-modal__member-list'>
              <ListMember
                ref={childRef}
                listMemberDeactivate={listMemberDeactivate}
                roleOptions={roleOptions}
                teamSearchResult={teamSearchResult}
                updateIsDeactivateYourself={setIsDeactivateYourself}
                updateSubmitError={setSubmitError}
              />
            </div>
          </Form>
        </FormProvider>
      </div>
      {submitError && <Error message={submitError} />}
      {errorRoleRequired && <Error message={manageTeamMessages.roleRequired} />}
      <div className='manage-team-modal__actions'>
        <Button
          className='primary-btn'
          type='submit'
          form='mange-team'
          loading={isSubmit}
          disabled={false}
        >
          {formatMessage(manageTeamMessages.updateBtn)}
        </Button>
        <Button
          className='secondary-btn'
          onClick={onClose}
        >
          {formatMessage(manageTeamMessages.cancelBtn)}
        </Button>
      </div>
    </div>
  )
}

export default ManageTeam