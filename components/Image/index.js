import React from 'react'
import { Image } from 'semantic-ui-react'

const UIImage = (props) => {
  const inputProps = _.omit(props, ['noWrapper'])
  return (
    <>
      {!!props.noWrapper ? <Image {...inputProps} /> : <div className='wrapper-image'><Image {...inputProps} /></div>} 
    </>
  )
}

export default UIImage