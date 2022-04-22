import React from 'react'
import { Image } from 'semantic-ui-react'
import CloseIcon from 'src/assets/icons/svgs/IconCross.svg'
import CompleteIcon from 'src/assets/icons/svgs/step_complete.svg'
import InformationIcon from 'src/assets/icons/svgs/Information.svg'
import GuidanceIcon from 'src/assets/icons/svgs/guidance.svg'
import WarningIcon from 'src/assets/icons/svgs/warning.svg'
import ErrorIcon from 'src/assets/icons/svgs/triangle.svg'
import InProgressIcon from 'src/assets/icons/svgs/InProgress.svg'
import CancelInProgressIcon from 'src/assets/icons/svgs/CancelInProgress.svg'
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
    case 'timed-out':
    case 'failed':
      return <Image src={ErrorIcon} />
    case 'in-progress':
      return <Image src={InProgressIcon} />
    case 'cancel-in-progress':
      return <Image src={CancelInProgressIcon} />
    default:
      return
  }
}

const Banner = (props) => {
  return (
    <div className={`banner-wrapper ${props.type} ${props.className}`}>
      {props.icon && <div className='banner-icon'>{renderIcon(props.type)}</div>}
      <div className='banner-text'>{props.text}</div>
      {props.close && <div className='banner-close'><Image src={CloseIcon} /></div>}
    </div>
  )
}

export default Banner