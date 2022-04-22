import React from 'react'
import { Modal } from 'semantic-ui-react'

class UIModal extends Modal {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className='wrapper-modal'><Modal {...this.props} /></div>
  }
}

export default UIModal