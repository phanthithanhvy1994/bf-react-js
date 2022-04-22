import React from 'react'
import { List } from 'semantic-ui-react'

class UIList extends List {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='wrapper-list'><List {...this.props} /></div>
  }
}

export default UIList