import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import {BrowserRouter} from "react-router-dom";
import store from "./store/store";
import {stripePromise} from "./stripe/stripe.utils";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Elements stripe={stripePromise}>


                <App/>
                </Elements>

            </Provider>
        </BrowserRouter>

    </React.StrictMode>
);

