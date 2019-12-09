import React, { FC, useCallback, useRef, useState } from 'react'
import { Form, Input, DatePicker, Button, Icon } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import AddModal from './AddModal'

const TableForm: FC<FormComponentProps> = ({ form }) => {
	const { getFieldDecorator } = form
	const modalForm = useRef<WrappedFormUtils>()
	const [visible, setVisible] = useState(false)

	//   搜索
	const search = useCallback(() => {
		form.validateFields((error, values) => {
			if (!error) {
				console.log(values)
			}
		})
	}, [form])

	//   重置搜索条件
	const reset = useCallback(() => {
		form.resetFields()
	}, [form])

	//   添加行
	const addRow = useCallback(() => {
		setVisible(true)
	}, [])

	//   确定添加数据
	const onOk = useCallback(() => {
		modalForm.current!.validateFields((error, values) => {
			if (!error) {
				setVisible(false)
				console.log(values)
			}
		})
	}, [])

	//   取消添加数据
	const onCancel = useCallback(() => {
		setVisible(false)
	}, [])

	return (
		<>
			<Form layout="inline" style={{ marginBottom: 20 }}>
				<Form.Item label="姓名">
					{getFieldDecorator('name')(
						<Input prefix={<Icon type="user" />} placeholder="输入姓名" />
					)}
				</Form.Item>
				<Form.Item label="车牌号">
					{getFieldDecorator('carId')(
						<Input prefix={<Icon type="car" />} placeholder="输入车牌号" />
					)}
				</Form.Item>
				<Form.Item label="联系方式">
					{getFieldDecorator('contact')(
						<Input prefix={<Icon type="phone" />} placeholder="输入联系方式" />
					)}
				</Form.Item>
				<Form.Item label="维修日期">
					{getFieldDecorator('date')(<DatePicker placeholder="选择维修日期" />)}
				</Form.Item>
				<Form.Item>
					<Button.Group>
						<Button type="primary" icon="search" onClick={search}>
							搜索
						</Button>
						<Button type="primary" icon="redo" onClick={reset}>
							重置
						</Button>
						<Button type="primary" icon="plus" onClick={addRow}>
							添加
						</Button>
					</Button.Group>
				</Form.Item>
			</Form>
			<AddModal
				wrappedComponentRef={modalForm}
				visible={visible}
				onOk={onOk}
				onCancel={onCancel}
			/>
		</>
	)
}

export default Form.create()(TableForm)
