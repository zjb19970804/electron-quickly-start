import React, {
  FC,
  useState,
  useCallback,
  useRef,
  KeyboardEvent,
  FocusEvent,
  useEffect,
  useContext
} from 'react'
import { EditableContext } from './EditableFormRow'
import Form from 'antd/lib/form/Form'
import { Input } from 'antd'
import { EditableCellProps } from './interface'

const EditableCell: FC<EditableCellProps> = ({
  children,
  dataIndex,
  record,
  title,
  handleSave
}) => {
  const [editing, setEdit] = useState(false)
  const form = useContext(EditableContext)
  const inputRef = useRef<Input>(null)

  useEffect(() => {
    editing && inputRef.current!.focus()
  }, [editing])

  //   切换编辑状态
  const toggleEdit = useCallback(() => {
    setEdit(state => !state)
  }, [])

  //   保存
  const save = useCallback(
    (e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => {
      const key = e.currentTarget.id
      form!.validateFields((error, values) => {
        if (error && error[key]) return
        toggleEdit()
        handleSave({ ...record, ...values })
      })
    },
    [form, record, toggleEdit, handleSave]
  )

  //   渲染的每个格子
  const renderCell = () => {
    const { getFieldDecorator } = form!
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required`
            }
          ],
          initialValue: record[dataIndex]
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save} />)}
      </Form.Item>
    ) : (
      <div style={{ lineHeight: '40px' }} onDoubleClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td style={{ textAlign: 'center' }}>{renderCell()}</td>
}

export default EditableCell
