import {Form, Input} from "antd";
import React from "react";
import {Record} from "@/shared/types/types.ts";

interface EditableCellProps {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'text';
    record: Record;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={[dataIndex as any]}
                    style={{margin: 0}}
                    rules={[{required: true, message: `Please Input ${title}!`}]}
                >
                    <Input/>
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;