import {Record} from "@/shared/types/types.ts";
import {NotNormalizedFormValue} from "@/features/addNewRecord/types/types.ts";

export const isDuplicate = (value: Record, recordsList: Record[]): boolean => {
    const duplicateRecord = recordsList.find((item) =>
        item.address.toLowerCase() === value.address.toLowerCase()
    );
    if (duplicateRecord) {
        return duplicateRecord.firstName.toLowerCase() === value.firstName.toLowerCase() &&
            duplicateRecord.lastName.toLowerCase() === value.lastName.toLowerCase() &&
            duplicateRecord.secondName.toLowerCase() === value.secondName.toLowerCase();
    } else {
        return false;
    }
}
export const mobileNumberDuplicate = (mobileNumber: string, recordList: Record[]): boolean => {
    return !!recordList.find((item) => item.mobileNumber === mobileNumber);

}

export const normalizeFormValue = (value: NotNormalizedFormValue): Record => {
    value.mobileNumber = value.prefix + value.mobileNumber
    delete value.prefix
    return value
}

