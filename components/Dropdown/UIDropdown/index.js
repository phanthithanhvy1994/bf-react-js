import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class UIDropdown extends Dropdown {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className='wrapper-dropdown'><Dropdown {...this.props} /></div>
  }
}

export default UIDropdown