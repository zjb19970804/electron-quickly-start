import React, { FC, forwardRef, useImperativeHandle } from 'react'
import { Form, Modal, Input, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import locale from 'antd/es/date-picker/locale/zh_CN'

interface AddModalProps extends FormComponentProps {
  visible: boolean
  onOk?: () => void
  onCancel?: () => void
}

const AddModal: FC<AddModalProps> = (
  { form, visible, onOk, onCancel },
  ref
) => {
  const { getFieldDecorator } = form

  useImperativeHandle(ref, () => ({ ...form }))

  return (
    <Modal
      title="请输入用户信息"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="确定"
      cancelText="取消"
      maskClosable={false}
      destroyOnClose
      width="40%"
    >
      <Form layout="vertical">
        <Form.Item label="姓名">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: 'name is must required'
              }
            ]
          })(<Input placeholder="请输入用户姓名" />)}
        </Form.Item>
        <Form.Item label="车牌号">
          {getFieldDecorator('carId')(<Input />)}
        </Form.Item>
        <Form.Item label="维修日期">
          {getFieldDecorator('date')(<DatePicker locale={locale} />)}
        </Form.Item>
        <Form.Item label="联系方式">
          {getFieldDecorator('contact')(
            <Input placeholder="电话号码或其他联系方式" />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create<AddModalProps>()(forwardRef(AddModal))
