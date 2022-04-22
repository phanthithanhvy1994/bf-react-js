import { types } from 'src/containers/Common/Components/RequestModal/constants'
import { MODE } from '../constants'

import messages from './messages'

const buildContent = (props) => {
  const { ViewResendBDARequestMes, renderResendFinancialInstitutions, handleClosePanel, disableSend, mode, handleResend } = props
  return [
    {
      header: messages.clientInformation.defaultMessage,
      tabChangable: true,
      form: {
        onSubmit: () => {},
        id: 'view-client-info',
        className: 'view-client-info'
      },
      content: [
        {
          type: types.texting,
          label: ViewResendBDARequestMes.clientDetails,
          className: 'view-client-info__title'
        },
        {
          type: types.input,
          label: ViewResendBDARequestMes.firstName,
          className: 'view-client-info__input',
          name: 'firstName',
          disabled: true
        },
        {
          type: types.input,
          label: ViewResendBDARequestMes.lastName,
          className: 'view-client-info__input',
          name: 'lastName',
          disabled: true
        },
        {
          type: types.input,
          label: ViewResendBDARequestMes.email,
          className: 'view-client-info__input',
          name: 'email',
          disabled: true
        }
      ],
      buttons: [
        {
          label: ViewResendBDARequestMes.cancelBtn,
          className: 'secondary-btn',
          onClick: () => handleClosePanel(),
        },
        {
          label: ViewResendBDARequestMes.nextBtn,
          className: 'primary-btn',
          type: 'submit',
          disabled: true
        }
      ]
    },
    {
      header: messages.financialInstitutions.defaultMessage,
      tabChangable: true,
      form: {
        id: 'resend-financial-institutions',
        onSubmit: (data) => handleResend(data),
        className: ''
      },
      content: [
        {
          type: 'custom',
          className: 'financial-institutions',
          content: renderResendFinancialInstitutions()
        }
      ],
      buttons: mode === MODE.EDIT ? [
        {
          label: ViewResendBDARequestMes.cancelBtn,
          className: 'secondary-btn',
          onClick: () => handleClosePanel()
        },
        {
          label: ViewResendBDARequestMes.sendBtn,
          className: 'primary-btn',
          onClick: null,
          type: 'submit',
          form: 'resend-financial-institutions',
          disabled: disableSend
        }
      ] : []
    }
  ]
}

export default buildContent