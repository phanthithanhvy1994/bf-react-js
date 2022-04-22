import React from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { DropzoneType } from './constants'
import { Image } from 'src/components'
import './styles.scss'

const UIDropzone = (props) => {
  const { dropzoneType, onDrop, title, content, dropzoneClassName, uploadingClass, icon, multiple, acceptExtensions } = props
  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: multiple, accept: acceptExtensions })

  const uploadedForm = () => {
    return (
      <div className='dropzone__content'>
        <Image className='dropzone__content__icon'
          src={icon}
          alt={title} />
        <p className='dropzone__content__uploaded'>
          {content}
        </p>
      </div>
    )
  }

  const uploadingForm = () => {
    return (
      <div className='dropzone__content'>
        <Image className='dropzone__content__icon'
          src={icon}
          alt={title} />
        <p className={`dropzone__descriptions ${uploadingClass}`}>
          {content}
        </p>
      </div>
    )
  }

  const uploadForm = () => {
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className='dropzone__content'>
          <Image className='dropzone__content__icon'
            src={icon}
            alt={title} />
          <p className={`dropzone__descriptions ${uploadingClass}`}>
            {content}
          </p>
        </div>
      </div>
    )
  }

  const render = () => {
    switch (dropzoneType) {
      case DropzoneType.uploaded:
        return uploadedForm()
      case DropzoneType.uploading:
        return uploadingForm()
      default:
        return uploadForm()
    }
  }

  return (<div className= {`wrapper-progress dropzone ${dropzoneType === DropzoneType.uploaded ? 'dropzone-bg-uploaded' : ''} ${dropzoneClassName}`}>{render()}</div>)
}

UIDropzone.propTypes = {
  dropzoneType: PropTypes.number,
  onDrop: PropTypes.func,
  multiple: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  dropzoneClassName: PropTypes.string,
  uploadingClass: PropTypes.string,
  icon: PropTypes.string
}

export default UIDropzone
