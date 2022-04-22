import React from 'react'
import { Icon } from 'semantic-ui-react'
class UIIcon extends Icon {
  constructor(props) {
    super(props)
  }
  
  render() {
    const inputProps = _.omit(this.props, ['noWrapper'])
    if (!!this.props.noWrapper) return <Icon {...inputProps} />
    return <div className='wrapper-icon'><Icon {...inputProps} /></div>
  }
}

export default UIIcon