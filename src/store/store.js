import rootReducer from './root-reducer';
import storage from 'redux-persist/lib/storage'; // uses localStorage
import { persistReducer, persistStore } from 'redux-persist';
import logger from "redux-logger/src";
import {configureStore} from "@reduxjs/toolkit";

const middleWares = [logger];


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['calendar'],
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(middleWares)
});

export const persistor = persistStore(store);

export default store;