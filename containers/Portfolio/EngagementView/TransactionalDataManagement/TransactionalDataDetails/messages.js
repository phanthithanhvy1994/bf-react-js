import { defineMessages } from 'react-intl'

export const scope = 'TransactionalDataDetails'
export default defineMessages({
  postingDate: {
    id: `${scope}.PostingDate`,
    defaultMessage: 'Posting Date'
  },
  journalEntryAmount: {
    id: `${scope}.JournalEntryAmount`,
    defaultMessage: 'Journal Entry Amount'
  },
  journalEntryDescription: {
    id: `${scope}.JournalEntryDescription`,
    defaultMessage: 'Journal Entry Description'
  },
  journalEntryInformation: {
    id: `${scope}.JournalEntryInformation`,
    defaultMessage: 'Journal Entry Information #'
  },
  detailHeader: {
    id: `${scope}.DetailHeader`,
    defaultMessage: 'Transactional data upload view'
  },
  error: {
    id: `${scope}.Error`,
    defaultMessage: 'Something wrong'
  }
})
