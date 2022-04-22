import React from 'react'
import { Step } from 'semantic-ui-react'

class UIStep extends Step {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='wrapper-step'><Step {...this.props} /></div>
  }
}

export default UIStep