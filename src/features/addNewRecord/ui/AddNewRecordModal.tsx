import React, {useState} from 'react';
import {Button, Modal, Form, Row, Input} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {addRecord} from "@/app/store/redusers/recordsSlice";
import {RootState} from "@/app/store/store";
import PhoneNumberField from "@/features/addNewRecord/ui/PhoneNumberField.tsx";
import {
    isDuplicate,
    normalizeFormValue,
    mobileNumberDuplicate
} from "@/features/addNewRecord/utils/utils.ts";
import {NotNormalizedFormValue} from "@/features/addNewRecord/types/types.ts";
import {handlePasteDigits, handlePasteLetters, isDigit, isLetter} from "@/shared/utils/inputUtils.ts";

const AddNewRecordModal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    const recordsList = useSelector((state: RootState) => state.recordsSlice.recordsList);
    const dispatch = useDispatch();

    const showModal = () => {
        form.resetFields();
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.validateFields()
            .then((value: NotNormalizedFormValue) => {
                const normalizedValue = normalizeFormValue(value);
                if (mobileNumberDuplicate(normalizedValue.mobileNumber, recordsList)) {
                    alert('Такой номер уже записан')
                } else {
                    if (!isDuplicate(normalizedValue, recordsList)) {
                        dispatch(addRecord(normalizedValue));
                        setIsModalOpen(false)

                    } else {
                        alert('Пользователь с таким ФИО и адресом уже существует');
                    }
                }
            })
            .catch((errInfo) => {
                console.log('Validate Failed:', errInfo);
            })
    };

    const validatePhoneNumber = (_: any, value: string) => {
        if (value && value.length < 6) {
            return Promise.reject('Длина не может быть менее 6 символов.');
        }
        return Promise.resolve();
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Добавить запись
            </Button>
            <Modal footer={null} title="Добавить Запись" open={isModalOpen} onCancel={handleCancel}>
                <Form
                    form={form}
                    onSubmitCapture={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                >
                    <Form.Item name="lastName" label="Фамилия"
                               rules={[{required: true, message: 'Пожалуйста введите свою фамилию!'}]}>
                        <Input
                            onKeyPress={isLetter}
                            onPaste={handlePasteLetters}
                            type="text"
                            placeholder="Иванов"
                        />
                    </Form.Item>
                    <Form.Item name="firstName" label="Имя"
                               rules={[{required: true, message: 'Пожалуйста введите своё имя!'}]}>
                        <Input
                            onKeyPress={isLetter}
                            onPaste={handlePasteLetters}
                            type="text"
                            placeholder="Иван"
                        />
                    </Form.Item>
                    <Form.Item name="secondName" label="Отчество"
                               rules={[{required: true, message: 'Пожалуйста введите своё отчество!'}]}>
                        <Input
                            onKeyPress={isLetter}
                            onPaste={handlePasteLetters}
                            type="text"
                            placeholder="Иванович"
                        />
                    </Form.Item>
                    <Form.Item name="address" label="Адрес"
                               rules={[{required: true, message: 'Пожалуйста введите свой адрес!'}]}>
                        <Input
                            type="text"
                            placeholder="г. Заринск ул. Пушкина д. 1"
                        />
                    </Form.Item>
                    <Form.Item name="homeNumber" label="Домашний Номер"
                               rules={[{
                                   required: true,
                                   message: 'Пожалуйста введите свой домашний номер!'
                               }, {validator: validatePhoneNumber}]}>
                        <Input
                            onKeyPress={isDigit}
                            onPaste={handlePasteDigits}
                            type="text"
                            placeholder="555555"
                        />
                    </Form.Item>

                    <PhoneNumberField/>

                    <Row justify="end" style={{columnGap: 20}}>
                        <Button type="default" onClick={handleCancel}>Отмена</Button>
                        <Button type="primary" htmlType="submit">Отправить</Button>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default AddNewRecordModal;
