import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import './styles.scss'

class UICheckbox extends Checkbox {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='wrapper-checkbox'><Checkbox {...this.props} /></div>
  }
}

export default UICheckbox