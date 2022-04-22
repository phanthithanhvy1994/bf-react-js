import React from 'react'
import { Image } from 'semantic-ui-react'
import CompleteIcon from 'src/assets/icons/svgs/step_complete.svg'
import InformationIcon from 'src/assets/icons/svgs/Information.svg'
import GuidanceIcon from 'src/assets/icons/svgs/guidance.svg'
import WarningIcon from 'src/assets/icons/svgs/warning.svg'
import ErrorIcon from 'src/assets/icons/svgs/triangle.svg'
import RefreshIcon from 'src/assets/icons/svgs/IconRefresh.svg'
import './styles.scss'

const renderIcon = (type) => {
  switch (type) {
    case 'success':
      return <Image src={CompleteIcon} />
    case 'information':
      return <Image src={InformationIcon} />
    case 'guidance':
      return <Image src={GuidanceIcon} />
    case 'warning':
      return <Image src={WarningIcon} />
    case 'error':
      return <Image src={ErrorIcon} />
    case 'refresh':
      return <Image src={RefreshIcon} />
    default:
      return
  }
}

const NotificationsInline = (props) => {
  return (
    <div className={`inline-wrapper ${props.type}`}>
      <div className='inline-title'>
        {renderIcon(props.type)} <div className='inline-text'>{props.title}</div>
      </div>
      <div className='inline-content'>{props.content}</div>
      <div className='inline-action' onClick={props.onClickButton}>
        {renderIcon('refresh')} {props.button}
      </div>
    </div>
  )
}

export default NotificationsInline