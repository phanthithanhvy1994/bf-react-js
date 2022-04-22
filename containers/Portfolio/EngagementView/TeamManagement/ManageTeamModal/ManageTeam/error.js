import React from 'react'
import errorIcon from 'src/assets/icons/svgs/teammember_error_icon.svg'
import { Image } from 'src/components'

const Error = (props) => {
  return (
    props?.message && <div className='manage-team-modal__error'>
      <div className='member-message'>
        <Image src={errorIcon} />
        <div className='error'>
          {props.message}
        </div>
      </div>
    </div>
  )
}

export default Error