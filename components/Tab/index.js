import React from 'react'
import { Tab } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class UITab extends Tab {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='wrapper-tab'><Tab {...this.props}>{this.props.children}</Tab></div>
  }
}

UITab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  defaultActiveIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  activeIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default UITab