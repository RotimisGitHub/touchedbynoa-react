import rootReducer from './root-reducer';
import logger from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";

const middleWares = [logger];

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(middleWares)
});



export default store;