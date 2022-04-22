import React from 'react'
import { Label } from 'semantic-ui-react'

class UILabel extends Label {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className='wrapper-label'><Label {...this.props} /></div>
  }
}

export default UILabel