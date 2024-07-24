import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import adminSlice from "./slice/adminSlice";
import beneficiarySlice from "./slice/beneficiarySlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        admin: adminSlice,
        beneficiary: beneficiarySlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore actions and state paths related to non-serializable data
                ignoredActions: ['beneficiary/setBeneficiaryData'],
                ignoredActionPaths: ['payload.targetDate'],
                ignoredPaths: ['beneficiary.beneficiaries.targetDate'],
            },
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
