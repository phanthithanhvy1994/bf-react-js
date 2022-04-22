import React, { forwardRef, useImperativeHandle } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'

import { openModal, closeModal } from 'src/containers/Common/actions'
import { DropdownInput, CheckboxControl } from 'src/components'

import { manageTeamMessages } from './constants'
import { settingsSelector } from 'src/containers/Setting/UserProfile/Redux'
import CloseIconBlue from 'src/assets/icons/svgs/close_blue.svg'

const ListMember = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const { roleOptions, teamSearchResult, updateIsDeactivateYourself, listMemberDeactivate, updateSubmitError } = props
  const { control, getValues, watch, setValue, setError } = useFormContext()
  const { fields, prepend } = useFieldArray({
    control,
    name: 'listMember'
  })
  const { formatMessage } = useIntl()
  const settingInfo = useSelector(settingsSelector)
  const { user: currentUser } = settingInfo

  useImperativeHandle(ref, () => ({
    handleAddMember(result) {
      handleAddMember(result)
    }
  }))

  const handleAddMember = (result) => {
    const searchValueSelected = result
    const memberSelected = teamSearchResult.find(user => user.azureId === searchValueSelected.value)

    if (!_.isEmpty(memberSelected)) {
      const listMemberValues = _.map((getValues()?.listMember), (member) => {
        const deactivateMemberCheck = member.deactivateMemberCheck

        if (!_.isEmpty(deactivateMemberCheck)) {
          return { ...deactivateMemberCheck.value, checkedDeactivate: deactivateMemberCheck.checked }
        }
      })
      const memberExisted = listMemberValues.find((member) => memberSelected.azureId === member.azureId && memberSelected.email === member.email)

      if (memberExisted) {
        const hasCheckDeactivate = listMemberValues.findIndex(memberValue =>
          memberValue.checkedDeactivate &&
          memberValue.azureId === memberExisted.azureId)

        if (hasCheckDeactivate !== -1) {
          const checkValue = getValues(`listMember[${hasCheckDeactivate}].deactivateMemberCheck`)
          setValue(`listMember[${hasCheckDeactivate}].deactivateMemberCheck`, { ...checkValue, checked: false })
          if(currentUser?.userId === _.get(checkValue, 'value.azureId')){
            updateIsDeactivateYourself(false)
          }
        } else {
          setError('search', {
            type: 'manual',
            message: formatMessage(manageTeamMessages.exitsMember)
          })
        }
      } else {
        let memberDeactivated = _.find(listMemberDeactivate, (memberDeactivated) => {
          return memberSelected.azureId === _.get(memberDeactivated, 'deactivateMemberCheck.value.azureId')
        })
        if (memberDeactivated) {
          memberDeactivated = {
            ...memberDeactivated, deactivateMemberCheck: {
              checked: false,
              value: { ...memberDeactivated.deactivateMemberCheck.value, isActive: true }
            }
          }
          prepend(memberDeactivated)
        } else {
          const valuePrepend = {
            roleId: '',
            role: '',
            deactivateMemberCheck: {
              checked: false,
              value: memberSelected,
              label: ''
            }
          }
          prepend(valuePrepend)
        }
      }
    }
  }

  const handleCloseDeactivate = (index) => {
    const checkValue = getValues(`listMember[${index}].deactivateMemberCheck`)
    setValue(`listMember[${index}].deactivateMemberCheck`, { ...checkValue, checked: false })
    if(currentUser?.userId === _.get(checkValue, 'value.azureId')){
      updateIsDeactivateYourself(false)
    }
    dispatch(closeModal())   
  }

  const handleDeactivateMember = (index) => {
    const data = getValues(`listMember[${index}].deactivateMemberCheck`)
    let headerModal = manageTeamMessages.deactivateMemberHeader
    let contentModal = manageTeamMessages.deactivateMemberContent
    if(currentUser.userId === data.value.azureId){
      headerModal = manageTeamMessages.deactivateOwnerHeader
      contentModal = manageTeamMessages.deactivateOwnerContent
      updateIsDeactivateYourself(true)
    }
    dispatch(openModal({
      className: 'deactivate-teamMember-modal',
      header: { content: formatMessage(headerModal) },
      body: { content: formatMessage(contentModal) },
      haveCloseIcon: CloseIconBlue,
      leftBtn: {
        listBtn: [{
          className: 'secondary-btn',
          label: formatMessage(manageTeamMessages.cancelBtn),
          onClick: () => handleCloseDeactivate(index)
        }]
      },
      rightBtn: {
        listBtn: [{
          className: 'primary-btn',
          label: formatMessage(manageTeamMessages.deactivateText),
          onClick: () => handleConfirmDeactivate(index)
        }]
      },
      onClose: () => handleCloseDeactivate(index)
    }))
    setTimeout(() => {
      document.getElementsByClassName('dimmer')[1].style.justifyContent = 'center'
    }, 1)
  }

  const handleConfirmDeactivate = () => {
    const data = getValues().listMember
    if (data.length == 1) {
      const error = manageTeamMessages.mustBeEngagementOwnerAssigned
      updateSubmitError(error)
    }
    dispatch(closeModal())
  }

  return (
    <>
      {fields.map((field, index) => {
        const member = _.get(field, 'deactivateMemberCheck.value')

        return (
          <div key={field.id} className='manage-team-modal__member'>
            <div className={`manage-team-modal__member-info ${watch(`listMember[${index}].deactivateMemberCheck`).checked ? 'disabledField' : ''}`}>
              <div className=''>{`${member.firstName} ${member.lastName}`}</div>
              <div className={`manage-team-modal__member-info--email ${watch(`listMember[${index}].deactivateMemberCheck`).checked ? 'disabledField' : ''}`}>{member.email}</div>
            </div>
            <div className='default-dropdown manage-team-modal__member-role'>
              <DropdownInput
                options={roleOptions?.map(role => { return { text: role.name, value: role.code } })}
                defaultValue={field.roleId}
                name={`listMember[${index}].role`}
                disabled={watch(`listMember[${index}].deactivateMemberCheck`).checked}
                placeholder={formatMessage(manageTeamMessages.rolePlaceholder)}
                validationForm={{ required: true }}
              />
            </div>
            <div className='manage-team-modal__member-deactivate-check'>
              <CheckboxControl
                name={`listMember[${index}].deactivateMemberCheck`}
                value={member}
                checked={field.deactivateMemberCheck.checked}
                onChange={() => handleDeactivateMember(index)}
                disabled={watch(`listMember[${index}].deactivateMemberCheck`).checked || watch(`listMember[${index}].role`) == ''}
              />
            </div>
          </div>
        )
      })}
    </>)
})


export default ListMember