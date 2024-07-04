import {combineReducers, configureStore} from "@reduxjs/toolkit";
import recordsSlice from "./redusers/recordsSlice.ts";

const rootReducer = combineReducers({
    recordsSlice
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']