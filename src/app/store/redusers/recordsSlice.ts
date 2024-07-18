import { Record } from "@/shared/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RecordsState {
    recordsList: Record[];
}

const initialList: Record[] = localStorage.getItem("records") ? JSON.parse(localStorage.getItem("records") as string) : [];
const initialState: RecordsState = {
    recordsList: [...initialList]
};

const recordsSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {
        addRecord(state, action: PayloadAction<Record>) {
            state.recordsList = [action.payload, ...state.recordsList];
        },
        deleteRecord(state, action: PayloadAction<string>) {
            state.recordsList = state.recordsList.filter((item) => item.mobileNumber !== action.payload);
        },
        changeRecordField(state, action: PayloadAction<{
            mobileNumber: string;
            field: keyof Record;
            newValue: string;
        }>) {
            state.recordsList = state.recordsList.map((item) => {
                if (item.mobileNumber === action.payload.mobileNumber) {
                    return { ...item, [action.payload.field]: action.payload.newValue };
                }
                return item;
            });
        },
        loadNewRecordsBook(state, action: PayloadAction<Record[]>) {
            state.recordsList = action.payload;
        }
    },
});

export const { addRecord, deleteRecord, changeRecordField, loadNewRecordsBook } = recordsSlice.actions;
export default recordsSlice.reducer;
