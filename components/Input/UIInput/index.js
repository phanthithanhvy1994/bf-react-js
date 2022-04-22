import React from 'react'
import { Input } from 'semantic-ui-react'
import './styles.scss'

class UIInput extends Input {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className='wrapper-input'><Input {...this.props} /></div>
  }
}

export default UIInput