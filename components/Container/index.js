import React from 'react'
import { Container } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const UIContainer = (props) => {
  return <Container className={`wrapper-container ${props.classes ? props.classes : ''}`} {...props} />
}

UIContainer.propTypes = {
  classes: PropTypes.string
}

export default UIContainer