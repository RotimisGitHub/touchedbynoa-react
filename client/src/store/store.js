import rootReducer from './root-reducer';
import {configureStore} from "@reduxjs/toolkit";
// import logger from "redux-logger";
//
//
// const middleWares = [];
//
// if (process.env.REACT_APP_DEV === 'yes') {
//     middleWares.push(logger);
// }

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    // }).concat(middleWares)
});


export default store;