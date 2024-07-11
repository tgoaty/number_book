export type Record = {
    lastName: string,
    firstName: string,
    secondName: string,
    address: string,
    homeNumber: string,
    mobileNumber: string
}
export type ColumnType = {
    title: string,
    dataIndex?: string,
    key: string,
    editable?: boolean,
    width: string,
    render?: (_: any, record: Record) => any
}