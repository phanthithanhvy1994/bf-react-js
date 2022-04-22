import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useIntl } from 'react-intl'

import { Dropdown } from 'src/components'
import { REQUEST_MODEL } from 'src/config/constants'
import { getDELsByPermissionThunk } from 'src/containers/Portfolio/Redux'

import { delOptionsConst, deleteBtn } from './constants'

const DeleteEngagement = (props) => {
    const dispatch = useDispatch()
    const { onChange, isDisabled } = props
    const [delOptions, setDelOptions] = useState(delOptionsConst)
    const delOption = useRef('')
    const model = REQUEST_MODEL
    const intl = useIntl()

    const checkPermisson = async () => {
        const { result } = unwrapResult(await dispatch(getDELsByPermissionThunk(model)))
        const newDelOptions = delOptions.map(item => ({
            ...item,
            disabled: !result.data[item.key]
        }
        ))
        setDelOptions(newDelOptions)
    }

    return <Dropdown
        onChange={onChange}
        onClick={checkPermisson}
        value={delOption.current}
        selection
        selectOnBlur={false}
        options={delOptions}
        disabled={isDisabled}
        text={intl.formatMessage(deleteBtn)}
        className='btn--delete'
        icon={false}
    />
}

export default DeleteEngagement