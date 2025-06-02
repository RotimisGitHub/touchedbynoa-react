import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import {BrowserRouter} from "react-router-dom";
import store, {persistor} from "./store/store";
import {PersistGate} from "redux-persist/integration/react";
import {stripePromise} from "./stripe/stripe.utils";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                {/*<PersistGate loading={null} persistor={persistor}>*/}

                <Elements stripe={stripePromise}>


                <App/>
                </Elements>
                {/*</PersistGate>*/}

            </Provider>
        </BrowserRouter>

    </React.StrictMode>
);

