import './App.css';
import {Fragment} from "react";
import Navigation from "./Routes/Navigation/Navigation.component";
import {Routes, Route} from "react-router-dom";
import Home from "./Routes/Home/Home.component";
import AuthComponent from "./Routes/Auth/auth.component";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<Home/>}/>
                    <Route path='auth' element={<AuthComponent />}/>
                </Route>

            </Routes>

        </Fragment>
    )
}

export default App;
