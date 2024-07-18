import {Form, Input, Select} from "antd";
import {listOfCodes} from "@/features/addNewRecord/modal/listOfCountryCodes.ts";
import {useState} from "react";
import {handlePasteDigits, isDigit} from "@/shared/utils/inputUtils.ts";
import {CountryOption} from "@/features/addNewRecord/types/types.ts";

const PhoneNumberField = () => {
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

    const prefixSelector = (<Form.Item name="prefix" initialValue="+7" noStyle>
        <Select
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
                onKeyPress={isDigit}
                onPaste={handlePasteDigits}
                addonBefore={prefixSelector}
                placeholder={mask}
                style={{width: '100%'}}
                type="text"
            />


        </Form.Item>
    );
};

export default PhoneNumberField;