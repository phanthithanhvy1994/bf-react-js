import React from 'react'

import { types } from 'src/containers/Common/Components/RequestModal/constants'
import { MODE } from '../constants'

import AddFinancialInstitution from '../AddFinancialInstitution'

const buildContent = (props) => {
  const { onChangeTab, handleClosePanel, showConfirmBeforeSend, steps, validationForm, messages, requestMessages } = props
  return [
    {
      header: messages.clientInformation.defaultMessage,
      form: {
        onSubmit: (data) => onChangeTab(steps.next, data),
        id: 'create',
        className: 'view-client-info'
      },
      content: [
        {
          type: types.texting,
          label: requestMessages.clientDetails,
          className: 'view-client-info__title'
        },
        {
          type: types.input,
          label: requestMessages.firstName,
          className: 'view-client-info__input',
          name: 'firstName',
          validationForm: validationForm.firstName
        },
        {
          type: types.input,
          label: requestMessages.lastName,
          className: 'view-client-info__input',
          name: 'lastName',
          validationForm: validationForm.lastName
        },
        {
          type: types.input,
          label: requestMessages.email,
          className: 'view-client-info__input',
          name: 'email',
          validationForm: validationForm.email
        }
      ],
      buttons: [
        {
          label: requestMessages.cancelBtn,
          className: 'secondary-btn',
          onClick: () => handleClosePanel()
        },
        {
          label: requestMessages.nextBtn,
          className: 'primary-btn',
          type: 'submit'
        }
      ]
    },
    {
      header: messages.financialInstitutions.defaultMessage,
      tabChangable: true,
      form: {
        onSubmit: (data) => showConfirmBeforeSend(data),
        id: 'institutions-info'
      },
      content: [
        {
          type: 'custom',
          className: 'financial-institutions',
          content: <AddFinancialInstitution {...props} mode={MODE.CREATE}/>
        }
      ],
      buttons: [
        {
          label: requestMessages.cancelBtn,
          className: 'secondary-btn',
          onClick: () => handleClosePanel()
        },
        {
          label: requestMessages.sendBtn,
          className: 'primary-btn',
          type: 'submit'
        }
      ]
    }
  ]
}

export default buildContent