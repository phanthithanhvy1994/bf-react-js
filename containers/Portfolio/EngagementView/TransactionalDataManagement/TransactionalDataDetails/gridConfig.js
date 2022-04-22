import { Enums } from './enum'

const TransactionalDataDetailsConfig = {
    title: 'Transactional_Data_Upload_View',
    columns: [
      {
        code: Enums.colNameEnum.postingDate,
        order: 0,
        class: 'freeze-columns freeze-column-1',
        headerClass: 'grid-cell header-cell',
        width: 150
      },
      {
        code: Enums.colNameEnum.journalEntryAmount,
        order: 1,
        class: 'freeze-columns freeze-column-2',
        headerClass: 'grid-cell header-cell',
        width: 140
      },
      {
        code: Enums.colNameEnum.journalEntryDescription,
        order: 2,
        class: 'freeze-columns freeze-column-3',
        headerClass: 'grid-cell header-cell',
        width: 165
      },
      {
        code: Enums.colNameEnum.journalEntryInformation,
        order: 3,
        class: 'jet-journal-entry-information',
        headerClass: 'grid-cell header-cell',
        width: 170
      }
    ]
  }

  export {
    TransactionalDataDetailsConfig
  }