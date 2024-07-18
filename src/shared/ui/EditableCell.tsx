import {Form, Input} from "antd";
import React from "react";
import {Record} from "@/shared/types/types.ts";
import {handlePasteDigits, handlePasteLetters, isDigit, isLetter} from "@/shared/utils/inputUtils.ts";

interface EditableCellProps {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'text';
    record: Record;
    index: number;
    children: React.ReactNode;
    onlyDigits?: boolean;
    onlyLetters?: boolean
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       onlyDigits,
                                                       onlyLetters,
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
                    {onlyLetters
                        ? <Input onKeyPress={isLetter}
                                 onPaste={handlePasteLetters}/>
                        : onlyDigits
                            ? <Input onKeyPress={isDigit}
                                     onPaste={handlePasteDigits}/>
                            : <Input/>}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;