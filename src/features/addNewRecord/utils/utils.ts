import React from "react";
import {Record} from "@/shared/types/types.ts";
import {NotNormalizedFormValue} from "@/features/addNewRecord/types/types.ts";



export const isLetter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() === e.key.toUpperCase()) {
        e.preventDefault();
    }
}

export const isDigit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.key >= '0' && e.key <= '9')) {
        e.preventDefault();
    }
}

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

export const normalizeFormValue = (value: NotNormalizedFormValue): Record => {
    value.mobileNumber = value.prefix + value.mobileNumber
    delete value.prefix
    return value
}
