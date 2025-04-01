import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import UserProvider from "./Context/UserProvider.component";
import CatalogProvider from "./Context/CatalogProvider.component";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>

                <CatalogProvider>
                    <App/>
                </CatalogProvider>


            </UserProvider>
        </BrowserRouter>

    </React.StrictMode>
);

