import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/app/store/store';
import {Form, Button, Table, Popconfirm, FormInstance} from 'antd';
import {changeRecordField, deleteRecord} from '@/app/store/redusers/recordsSlice';
import EditableCell from '@/shared/ui/EditableCell';
import {ColumnType, Record} from '@/shared/types/types';

const RecordsListBlock: React.FC = () => {
    const recordsList = useSelector((state: RootState) => state.recordsSlice.recordsList);
    const dispatch = useDispatch();
    const [form] = Form.useForm<FormInstance>();
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        localStorage.setItem('records', JSON.stringify(recordsList));
    }, [recordsList]);

    const handleEdit = (record: Record) => {
        form.setFieldsValue({...record} as any);
        setIsEditing({[record.mobileNumber]: true});
    };

    const handleCancel = () => {
        setIsEditing({});
    };

    const handleSave = async (key: string) => {
        try {
            const row = await form.validateFields() as Partial<Record>;
            (Object.keys(row) as Array<keyof Record>).forEach((field) => {
                dispatch(changeRecordField(
                    {mobileNumber: key, field, newValue: row[field] as string}
                ));
            });
            handleCancel();
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const handleDelete = (record: Record) => {
        dispatch(deleteRecord(record.mobileNumber))
    };

    const columns: ColumnType[] = [
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
            key: 'lastName',
            editable: true,
            width: '10%',
        },
        {
            title: 'Имя',
            dataIndex: 'firstName',
            key: 'firstName',
            editable: true,
            width: '10%',
        },
        {
            title: 'Отчество',
            dataIndex: 'secondName',
            key: 'secondName',
            editable: true,
            width: '10%',
        },
        {
            title: 'Адрес',
            dataIndex: 'address',
            key: 'address',
            editable: true,
            width: '20%',
        },
        {
            title: 'Домашний номер',
            dataIndex: 'homeNumber',
            key: 'homeNumber',
            editable: true,
            width: '15%',
        },
        {
            title: 'Мобильный номер',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
            editable: true,
            width: '15%',
        },
        {
            title: 'Действия',
            key: 'actions',
            width: '20%',
            render: (_: any, record: Record) => {
                const isEditingRecord = isEditing[record.mobileNumber];
                return isEditingRecord ? (
                    <>
                        <Popconfirm
                            title="Сохранить изменения?"
                            onConfirm={() => handleSave(record.mobileNumber)}
                            cancelText="Отмена"
                        >
                            <Button type="primary" style={{marginRight: 8}}>
                                Сохранить
                            </Button>
                        </Popconfirm>
                        <Button onClick={handleCancel}>Отмена</Button>
                    </>
                ) : (
                    <>
                        <Button
                            style={{marginRight: 8}}
                            disabled={Object.values(isEditing).some((val) => val)}
                            onClick={() => handleEdit(record)}
                        >
                            Редактировать
                        </Button>
                        <Popconfirm
                            cancelText="Отмена"
                            title="Удалить строку?"
                            onConfirm={() => handleDelete(record)}
                        >
                            <Button danger type="text">
                                Удалить
                            </Button>
                        </Popconfirm>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing[record.mobileNumber],
                onlyDigits: col.dataIndex === "homeNumber" || col.dataIndex === "mobileNumber",
                onlyLetters: col.dataIndex === "firstName" || col.dataIndex === "secondName" || col.dataIndex === "lastName"
            }),
        } as ColumnType;
    });

    return (
        <Form form={form} component={false}>
            <Table
                rowKey={(record) => record.mobileNumber}
                bordered
                dataSource={recordsList}
                columns={mergedColumns}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
            />
        </Form>
    );
};

export default RecordsListBlock;
