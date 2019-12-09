import React, { FC, createContext } from 'react'
import { Form } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'

export const EditableContext = createContext<WrappedFormUtils | null>(null)

const EditableFormRow: FC<FormComponentProps> = ({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
)

export default Form.create()(EditableFormRow)
