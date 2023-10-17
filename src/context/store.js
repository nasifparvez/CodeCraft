import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./reducers";

const store = configureStore({
    reducer: myReducer,
    devTools: process.env.NODE_ENV
});

export default store;