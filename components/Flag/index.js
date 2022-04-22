import React from 'react'
import { Flag } from 'semantic-ui-react'

class UIFlag extends Flag {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className='wrapper-flag'><Flag {...this.props} /></div>
  }
}

export default UIFlag