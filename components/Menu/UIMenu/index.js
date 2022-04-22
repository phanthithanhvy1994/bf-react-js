import React from 'react'
import { Menu } from 'semantic-ui-react'

class UIMenu extends Menu {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='wrapper-menu'><Menu {...this.props} /></div>
  }
}

export default UIMenu