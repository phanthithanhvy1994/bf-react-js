import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Header } from 'src/components'
import { authorizedInstitutionsMessages } from './constants'

function AuthorizedInstitutionsHeader() {
  return (
    <div className='authorized-institutions__title'>
      <Header as='h1'>
        {authorizedInstitutionsMessages.authorizedInstitutions}
      </Header>
    </div>
  )
}

export default AuthorizedInstitutionsHeader
