import React, {useState} from 'react';
import {Select, Button, Modal, Form, Row, Input} from "antd";
import {Record} from "@/shared/types/types.ts";
import {useDispatch, useSelector} from "react-redux";
import {addRecord} from "@/app/store/redusers/recordsSlice.ts";
import {RootState} from "@/app/store/store.ts";
import {listOfCodes} from "../modal/listOfCountryCodes.ts";

const AddNewRecordModal = () => {
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [form] = Form.useForm();
    const [mask, setMask] = useState();
    const [currentCountryCode, setCurrentCountryCode] = useState('+7');

    const recordsList = useSelector((state: RootState) => state.recordsSlice.recordsList);
    const dispatch = useDispatch();

    const isDuplicate = (value) => {
        const duplicateRecord = recordsList.find((item) =>
            item.address.toLowerCase() === value.address.toLowerCase()
        );
        if (duplicateRecord) {
            return duplicateRecord.firstName.toLowerCase() === value.firstName.toLowerCase() &&
                duplicateRecord.lastName.toLowerCase() === value.lastName.toLowerCase() &&
                duplicateRecord.secondName.toLowerCase() === value.secondName.toLowerCase();
        } else {
            return false
        }
    }
    const showModal = () => {
        setIsModelOpen(true);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.validateFields()
            .then((value: Record) => {
                if (!isDuplicate(value)) {
                    value.mobileNumber = currentCountryCode + value.mobileNumber;
                    dispatch(addRecord(value));
                    setIsModelOpen(false);
                    form.resetFields();
                } else {
                    alert('пользователь с таким фио и аддресом уже существует')
                }
            })
            .catch(() => {
                console.log();
            })
    };

    const handleCancel = () => {
        setIsModelOpen(false);
        form.resetFields();
    }

    const isLetter = (e) => {
        if (e.key.toLowerCase() === e.key.toUpperCase()) {
            e.preventDefault();
        }
    }

    const isDigit = (e) => {
        if (!(e.key >= '0' && e.key <= '9')) {
            e.preventDefault();
        }
    }

    const handleSelect = (option) => {
        setCurrentCountryCode(option.value)
        const countryCode = option.key;
        const selectedCode = listOfCodes.find((item) => item.iso === countryCode);
        if (selectedCode) {
            setMask(selectedCode.phoneNumberFormat);
        }
    };

    const prefixSelector = (
        <Form.Item noStyle>
            <Select
                showSearch
                onSelect={(value, option) => handleSelect(option)}
                style={{width: 90}}
                popupMatchSelectWidth={false}
                optionFilterProp="label"
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                optionLabelProp="value"
                options={listOfCodes.map(item => ({
                    key: item.iso,
                    label: `${item.country} +${item.code}`,
                    value: `+${item.code}`
                }))}
            >
            </Select>
        </Form.Item>
    );
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
                    <Form.Item name="mobileNumber" label="Мобильный Номер"
                               rules={[{required: true, message: 'Пожалуйста введите свой мобильный номер!'}]}>
                        <Input onKeyPress={(e) => {
                            isDigit(e)
                        }} addonBefore={prefixSelector} placeholder={mask} style={{width: '100%'}} type="text"/>
                    </Form.Item>

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