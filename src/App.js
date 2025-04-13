import './App.css';
import {Fragment} from "react";
import Navigation from "./Routes/Navigation/Navigation.component";
import {Routes, Route} from "react-router-dom";
import Home from "./Routes/Home/Home.component";
import AuthComponent from "./Routes/Auth/auth.component";
import Catalog from "./Routes/Catalog/Catalog.component";
import Product from "./Routes/Products/Product.component";
import ProfileNavigation from "./Routes/Profile/Profile-Navigation/profile-navigation.component";
import ProfileAccount from "./Routes/Profile/Profile-Account/profile-account.component";
import CalendarCustom from "./Routes/Booking-Confirmation/Calendar/Calendar.component";
import BookingPage from "./Routes/Booking-Confirmation/Booking-Page.components";
import ProfileBooking from "./Routes/Profile/Profile-Bookings/Profile-Booking.component";

function App() {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<Home/>}/>
                    <Route path='auth' element={<AuthComponent />}/>
                    <Route path='services/*' element={<Catalog />}/>
                    <Route path="services/:productId" element={<Product />} />
                    <Route path="booking-page" element={<BookingPage />} />

                    <Route path='profile/*' element={<ProfileNavigation/>}>
                        <Route index element={<ProfileAccount/>}/>
                        <Route path='account' element={<ProfileAccount/>}/>
                        <Route path='bookings' element={<ProfileBooking/>}/>
                    </Route>
                </Route>

            </Routes>

        </Fragment>
    )
}

export default App;
