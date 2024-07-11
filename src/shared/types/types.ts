export interface Record {
    lastName: string,
    firstName: string,
    secondName: string,
    address: string,
    homeNumber: string,
    mobileNumber: string
}
export interface ColumnType {
    title: string,
    dataIndex?: string,
    key: string,
    editable?: boolean,
    width: string,
    render?: (_: any, record: Record) => any
}
export interface CountryInfo {
    country: string,
    code: string,
    iso: string,
    phoneNumberFormat: string
}