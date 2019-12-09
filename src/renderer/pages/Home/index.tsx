import React, { FC, useMemo, useCallback, useState, useEffect } from 'react'
import { Table, Button, Modal } from 'antd'
import { PaginationConfig } from 'antd/lib/table'
import { DataProps, EditColumnProps } from './interface'
import EditableCell from './EditableCell'
import EditableFormRow from './EditableFormRow'
import TableForm from './TableForm'

const Home: FC = () => {
	const [dataSource, setData] = useState<DataProps[]>([])
	const [pagination, setPagination] = useState({
		total: 0,
		current: 1,
		pageSize: 10
	})

	useEffect(() => {
		const res = [
			{
				id: 1,
				name: 'zjb',
				carId: '鄂Ae86',
				contact: 13871231102,
				date: '2019-08-04'
			},
			{
				id: 2,
				name: 'asdsa',
				carId: '粤AE84',
				contact: 1515481512,
				date: '2018-10-20'
			}
		]
		setData(res)
		setPagination(state => ({ ...state, total: 20 }))
	}, [])

	//   分页变化回调
	const paginationChange = useCallback((pag: PaginationConfig) => {
		setPagination(state => ({ ...state, current: pag.current as number }))
	}, [])

	//   保存编辑
	const handleSave = useCallback(
		(rowData: DataProps) => {
			const newData = dataSource.slice(0)
			const index = newData.findIndex(item => item.id === rowData.id)
			const current = newData[index]
			newData.splice(index, 1, {
				...current,
				...rowData
			})
			setData(newData)
		},
		[dataSource]
	)

	//   删除行
	const delRow = useCallback(id => {
		Modal.confirm({
			title: '警告',
			content: '删除后不可恢复，确定要删除该条数据吗？',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk: () => {
				console.log(id)
			}
		})
	}, [])

	const columns = useMemo(() => {
		const tableCol: EditColumnProps[] = [
			{
				title: '姓名',
				dataIndex: 'name',
				align: 'center',
				width: '15%',
				editable: true
			},
			{
				title: '车牌号',
				dataIndex: 'carId',
				align: 'center',
				width: '15%',
				editable: true
			},
			{
				title: '联系方式',
				dataIndex: 'contact',
				align: 'center',
				width: '30%',
				editable: true
			},
			{
				title: '维修日期',
				dataIndex: 'date',
				align: 'center',
				width: '30%',
				editable: true
			},
			{
				title: '操作',
				dataIndex: 'id',
				align: 'center',
				width: '10%',
				render: id => (
					<Button type="danger" onClick={() => delRow(id)}>
						删除
					</Button>
				)
			}
		]
		// 传递编辑状态的所需的参数
		return tableCol.map(col => {
			if (col.editable) {
				return {
					...col,
					onCell: (record: DataProps) => ({
						record,
						editable: col.editable,
						dataIndex: col.dataIndex,
						title: col.title,
						handleSave
					})
				}
			}
			return col
		})
	}, [handleSave, delRow])

	const components = {
		body: {
			row: EditableFormRow,
			cell: EditableCell
		}
	}

	return (
		<div>
			<TableForm />
			<Table
				components={components}
				bordered
				rowKey="id"
				dataSource={dataSource}
				columns={columns}
				pagination={pagination}
				onChange={paginationChange}
			/>
		</div>
	)
}

export default Home
