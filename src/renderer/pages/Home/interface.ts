import { ColumnProps } from 'antd/lib/table/interface'

export interface DataProps {
  id: string | number
  name: string
  carId: string
  contact: string | number
  date: string
}

export interface EditColumnProps extends ColumnProps<DataProps> {
  editable?: boolean
}

export interface EditableCellProps {
  record: DataProps
  dataIndex: keyof DataProps
  title: string
  handleSave: (v: DataProps) => void
}
