import React from 'react'
import { Image, Header } from 'src/components'
import checked from 'src/assets/icons/svgs/checked.svg'

const ContentToast = (props) => {
  return (
    <div className='centered'>
      <Image src={checked} centered />
      <Header>{props?.message}</Header>
    </div>
  )
}

export default ContentToast