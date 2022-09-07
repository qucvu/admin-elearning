import {configureStore} from "@reduxjs/toolkit";
import auth from "Slices/auth";
import user from "Slices/userSlice"
import course from "Slices/courseSLice"

const store = configureStore({
    reducer: {
        auth,
        user,
        course
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
