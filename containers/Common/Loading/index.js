import React from 'react'
import { useSelector } from 'react-redux'

import { Loader } from 'src/components'
import { loadingSelector } from 'src/containers/Common/selectors'

const Loading = () => {
  const loadingState = useSelector(loadingSelector)

  return <Loader className='custom-loader' {...loadingState} />
}

export default Loading