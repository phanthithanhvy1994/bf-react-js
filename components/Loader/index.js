import React from 'react'
import { Loader } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './styles.scss'

const UILoader = (props) => {
  return <div className={`wrapper-loader ${props.inline && 'inline'}`}>
    <Loader {...props} />
    <div className={`loader-backdrop ${!props.active ? 'hide' : ''}`}></div>
  </div>
}

UILoader.propTypes = {
  active: PropTypes.bool,
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  content: PropTypes.any,
  disabled: PropTypes.bool,
  indeterminate: PropTypes.bool,
  inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  inverted: PropTypes.bool,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'])
}

export default UILoader