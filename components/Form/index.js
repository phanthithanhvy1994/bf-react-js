import React from 'react'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class UIForm extends Form {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className='wrapper-form'><Form {...this.props} >{this.props.children}</Form></div>
  }
}

UIForm.propTypes = {
  children: PropTypes.node
}

export default UIForm