import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import { REQUEST_MODEL } from 'src/config/constants'
import { useParams } from 'react-router-dom'

const TransactionalGetFile = (props) => {
  const [messages, setMessages] = useState({})
  const [queryData, setQueryData] = useState({})
  const [fileName, setFileName] = useState('fileName.xlsx')

  useEffect(() => {
    if (props.messages && props.messages !== messages) {
      setMessages(props.messages)
    }
    if (props.fileName && props.fileName !== fileName) {
      setFileName(props.fileName)
    }
    if (props.queryData && props.queryData !== queryData) {
      setQueryData(props.queryData)
    }
  }, [props])

  const { geoCode, containerCode, engagementId } = useParams()
  const onClickToGet = async () => {
    if (props.serviceApi && typeof props.serviceApi === 'function') {
      let model = REQUEST_MODEL
      model.uri = { engagementId, containerCode }
      model.geoCode = geoCode
      if (queryData && queryData !== {}) {
        model.query = queryData
      }

      const resultAction = await props.serviceApi(model)
      // checking matching feature is enable or not
      if (_.get(resultAction, 'result.statusCode') === 405) {
        return props.showWarningPopup()
      }
      const { error, result } = resultAction
      if (error || !result) {
        //get file has failed.
        return
      }
      // 1. Create blob link to download
      const url = window.URL.createObjectURL(new Blob([result]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', fileName)
      // 2. Append to html page
      document.body.appendChild(link)
      // 3. Force download
      link.click()
      // 4. Clean up and remove the link
      link.parentNode.removeChild(link)
    }
  }

  return (
    <>
      {messages && messages.id ?
      <FormattedMessage
        {...messages}
        values={{
          a: (...chunks) => <a onClick={onClickToGet} href='#'>{chunks}</a>,
        }}
      />:''}
    </>
  )
}
export default TransactionalGetFile