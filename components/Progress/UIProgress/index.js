import React from 'react'
import { Progress } from 'semantic-ui-react'

const UIProgress = (props) => {
  return (<div className={`wrapper-progress ${props.className ? props.className : ''}`}>
    <Progress
      percent={props.percent}
      attached={props.attached}
      color={props.color}
      active={props.active}
    />
  </div>)
}

export default UIProgress
