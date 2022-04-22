import React from 'react'
import { Header } from 'semantic-ui-react'
import './styles.scss'

const UIHeader = (props) => {
  return <div className='wrapper-header'><Header {...props} /></div>
}

export default UIHeader