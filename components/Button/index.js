import React from 'react'
import { Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import './styles.scss'

class UIButton extends Button {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className='wrapper-button'><Button {...this.props}>{this.props.children}</Button></div>
  }
}

UIButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default UIButton