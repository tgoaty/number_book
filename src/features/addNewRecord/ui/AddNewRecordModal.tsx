import React, {useState} from 'react';
import {Button, Modal, Form, Row, Input} from "antd";
import {Record} from "@/shared/types/types";
import {useDispatch, useSelector} from "react-redux";
import {addRecord} from "@/app/store/redusers/recordsSlice";
import {RootState} from "@/app/store/store";
import PhoneNumberFiled from "@/features/addNewRecord/ui/PhoneNumberFiled.tsx";
import {isLetter, isDigit, isDuplicate} from "@/features/addNewRecord/utils/utils.ts";

const AddNewRecordModal: React.FC = () => {
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [form] = Form.useForm();

    const recordsList = useSelector((state: RootState) => state.recordsSlice.recordsList);
    const dispatch = useDispatch();

    const showModal = () => {
        setIsModelOpen(true);
    };

    const handleCancel = () => {
        setIsModelOpen(false);
        form.resetFields();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.validateFields()
            .then((value: Record) => {
                if (!isDuplicate(value, recordsList)) {
                    dispatch(addRecord(value));
                    setIsModelOpen(false);
                    form.resetFields();
                } else {
                    alert('Пользователь с таким ФИО и адресом уже существует');
                }
            })
            .catch((errInfo) => {
                console.log('Validate Failed:', errInfo);
            });
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
                    <Form.Item name="firstName" label="Имя"
                               rules={[{required: true, message: 'Пожалуйста введите своё имя!'}]}>
                        <Input onKeyPress={(e) => {
                            isLetter(e)
                        }} type="text" placeholder="Иван"/>
                    </Form.Item>
                    <Form.Item name="lastName" label="Фамилия"
                               rules={[{required: true, message: 'Пожалуйста введите свою фамилию!'}]}>
                        <Input onKeyPress={(e) => {
                            isLetter(e)
                        }} type="text" placeholder="Иванов"/>
                    </Form.Item>
                    <Form.Item name="secondName" label="Отчество"
                               rules={[{required: true, message: 'Пожалуйста введите своё отчество!'}]}>
                        <Input onKeyPress={(e) => {
                            isLetter(e)
                        }} type="text" placeholder="Иванович"/>
                    </Form.Item>
                    <Form.Item name="address" label="Адрес"
                               rules={[{required: true, message: 'Пожалуйста введите свой адрес!'}]}>
                        <Input type="text" placeholder="г. Заринск ул. Пушкина д. 1"/>
                    </Form.Item>
                    <Form.Item name="homeNumber" label="Домашний Номер"
                               rules={[{required: true, message: 'Пожалуйста введите свой домашний номер!'}]}>
                        <Input onKeyPress={(e) => {
                            isDigit(e)
                        }} type="text" placeholder="555555"/>
                    </Form.Item>

                    {<PhoneNumberFiled/>}

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
