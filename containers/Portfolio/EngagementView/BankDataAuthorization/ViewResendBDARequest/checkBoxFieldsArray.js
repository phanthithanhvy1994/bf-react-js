import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form' 

import { CheckboxControl } from 'src/components'

const CheckBoxFieldsArray = ({ name }) => {
  const { control } = useFormContext()
  const { fields } = useFieldArray({
    control,
    name
  })

  return (
    <>
      {fields.map((field, index) => {
        return (
          <CheckboxControl
            key={field.id}
            label={field.authorizeCheck.label}
            name={`${name}[${index}].authorizeCheck`}
            value={field.authorizeCheck.value}
            checked={field.authorizeCheck.checked}
          />) || ''
      })
      }
    </>
  )
}

export default CheckBoxFieldsArray