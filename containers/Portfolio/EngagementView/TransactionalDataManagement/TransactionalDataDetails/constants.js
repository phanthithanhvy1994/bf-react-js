import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { Enums } from './enum'

const TransactionalDataDetailsMessages = {
  postingDate: { id: Enums.colNameEnum.postingDate, value: <FormattedMessage {...messages.postingDate} /> },
  journalEntryAmount: { id: Enums.colNameEnum.journalEntryAmount, value: <FormattedMessage {...messages.journalEntryAmount} /> },
  journalEntryDescription: { id: Enums.colNameEnum.journalEntryDescription, value: <FormattedMessage {...messages.journalEntryDescription} /> },
  journalEntryInformation: { id: Enums.colNameEnum.journalEntryInformation, value: <FormattedMessage {...messages.journalEntryInformation} /> },
  detailHeader: <FormattedMessage {...messages.detailHeader} />,
  error: <FormattedMessage {...messages.error} />
}

export { TransactionalDataDetailsMessages }
