import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import adminSlice from "./slice/adminSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice
    }
})


export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch