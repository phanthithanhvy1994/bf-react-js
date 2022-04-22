import React from 'react'
import { Search } from 'semantic-ui-react'

class UISearch extends Search {
  constructor(props) {
    super(props)
  }

  render() {
    return <div className='wrapper-search'><Search {...this.props} /></div>
  }
}

export default UISearch