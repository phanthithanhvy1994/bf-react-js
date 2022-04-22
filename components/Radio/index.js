import React from 'react'
import { Radio } from 'semantic-ui-react'

import './styles.scss'

const UIRadio = (props) => {

  const handleChange = (e, { value }) => {
    props.onChangeRadio(value)
  }

  return (<div className='wrapper-radio'>
    <Radio
      name={props.name}
      value={props.value}
      checked={props.checked}
      onClick={handleChange}
    />
  </div>)
}

export default UIRadio
