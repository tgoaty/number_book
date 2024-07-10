import {Form, Input, Select} from "antd";
import {listOfCodes} from "@/features/addNewRecord/modal/listOfCountryCodes.ts";
import React, {useState} from "react";
import {isDigit} from "@/features/addNewRecord/utils/utils.ts";
import {CountryOption} from "@/features/addNewRecord/types/types.ts";

const PhoneNumberFiled = () => {
    const [mask, setMask] = useState<string>('000 000 00 00');
    const handleSelect = (option: CountryOption) => {
        const countryCode = option.key;
        const selectedCode = listOfCodes.find((item) => item.iso === countryCode);
        if (selectedCode) {
            setMask(selectedCode.phoneNumberFormat);
        }
    };

    const validatePhoneNumber = (_: any, value: string) => {
        const length = mask.split(' ').join('').length
        if (value && value.length !== length) {
            return Promise.reject('Некорректная длина номера телефона!');
        }
        return Promise.resolve();
    };

    const prefixSelector = (<Form.Item noStyle>
        <Select
            defaultValue="+7"
            showSearch
            onSelect={(_, option: CountryOption) => handleSelect(option)}
            style={{width: 90}}
            popupMatchSelectWidth={false}
            optionFilterProp="label"
            filterSort={(optionA: CountryOption, optionB: CountryOption) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            optionLabelProp="value"
            options={listOfCodes.map(item => ({
                key: item.iso,
                label: `${item.country} +${item.code}`,
                value: `+${item.code}`
            } as CountryOption))}
        />
    </Form.Item>)

    return (
        <Form.Item name="mobileNumber" label="Мобильный Номер"
                   rules={[{
                       required: true,
                       message: 'Пожалуйста введите свой мобильный номер!'
                   }, {validator: validatePhoneNumber}]}>
            <Input
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    isDigit(e)
                }}
                addonBefore={prefixSelector}
                placeholder={mask}
                style={{width: '100%'}}
                type="text"
            />


        </Form.Item>
    );
};

export default PhoneNumberFiled;