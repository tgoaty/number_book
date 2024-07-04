import {Record, recordFields} from "@/shared/types/types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface recordsState {
    recordsList: Record[]
}

const initialList = localStorage.getItem<Record[]>("records") ? JSON.parse(localStorage.getItem<Record[]>("records")) : []
const initialState: recordsState = {
    recordsList: [...initialList]
};
const recordsSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {
        addRecord(state, action: PayloadAction<Record>) {
            state.recordsList = [...state.recordsList, action.payload]
        },
        deleteRecord(state, action: PayloadAction<string>) {
            state.recordsList = state.recordsList.filter((item) => item.mobileNumber !== action.payload)
        },
        changeRecordField(state, action: PayloadAction<{
            mobileNumber: string,
            field: recordFields,
            newValue: string
        }>) {
            state.recordsList = state.recordsList.map((item) => {
                if (item.mobileNumber === action.payload.mobileNumber) {
                    return {...item, [action.payload.field]: action.payload.newValue};
                }
                return item;
            });
        },
        loadNewRecordsBook(state, action: PayloadAction<Record[]>) {
            state.recordsList = action.payload
        }
    },
})

export const {addRecord, deleteRecord, changeRecordField, loadNewRecordsBook} = recordsSlice.actions;
export default recordsSlice.reducer;
