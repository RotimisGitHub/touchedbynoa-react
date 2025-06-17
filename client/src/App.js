import './App.css';
import {Fragment, useEffect} from "react";
import Navigation from "./Routes/Navigation/Navigation.component";
import {Routes, Route} from "react-router-dom";
import Home from "./Routes/Home/Home.component";
import AuthComponent from "./Routes/Auth/auth.component";
import Catalog from "./Routes/Catalog/Catalog.component";
import Product from "./Routes/Products/Product.component";
import ProfileNavigation from "./Routes/Profile/Profile-Navigation/profile-navigation.component";
import ProfileAccount from "./Routes/Profile/Profile-Account/profile-account.component";
import BookingPage from "./Routes/Booking-Confirmation/Booking-Page.components";
import ProfileBooking from "./Routes/Profile/Profile-Bookings/Profile-Booking.component";
import AdminDashboard from "./Routes/Admin/Admin-Dashboard/Admin-Dashboard.component";
import AdminNavigation from "./Routes/Admin/Admin-Navigation/Admin-Navigation.component";
import AdminBookings from "./Routes/Admin/Admin-Bookings/Admin-Bookings.component";
import ContentManagement from "./Routes/Admin/Admin-Content-Management/content-management.component";
import {useDispatch, useSelector} from "react-redux";
import {createUserDocument, onAuthStateChangedListener, retrieveUserRole} from "./utils/firebase/firebase-users.utils";
import {clearUser, setCurrentUser} from "./store/user/user.reducer";
import {retrieveAllStats} from "./utils/firebase/firebase-admin-analytics.utils";
import {setAnalytics} from "./store/analytics/analytics.reducer";
import {getCollectionAndDocuments} from "./utils/firebase/firebase-collections.utils";
import {setAllHairstyles} from "./store/hairstyles/hairstyles.reducer";

function App() {
    const dispatch = useDispatch()
    const {role} = useSelector((state) => state.user)
    const isAdmin = role === 'admin';

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {
                await createUserDocument(user);
                const role =  await retrieveUserRole(user)
                dispatch(setCurrentUser({user, role}))
            }
            else {
                dispatch(clearUser())
            }

        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const hairstyles = await getCollectionAndDocuments('Hairstyles');
            dispatch(setAllHairstyles(hairstyles))
        }


        getCategories()
    }, []);


    useEffect(() => {
        const retrieveAdminAnalytics = async () => {
            if (isAdmin) {
                const data = await retrieveAllStats();
                dispatch(setAnalytics(data));
            }

        }
        retrieveAdminAnalytics()
    }, [isAdmin]);

    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Navigation/>}>
                    <Route index element={<Home/>}/>
                    <Route path='auth' element={<AuthComponent />}/>
                    <Route path='services/*' element={<Catalog />}/>
                    <Route path="services/:productId" element={<Product />} />
                    <Route path="booking-page" element={<BookingPage />} />
                    <Route path="admin/*" element={<AdminNavigation />}>
                        <Route index element={<AdminDashboard />}/>
                        <Route path='dashboard' element={<AdminDashboard />}/>
                        <Route path='bookings' element={<AdminBookings />}/>
                        <Route path='content-management' element={<ContentManagement />}/>
                    </Route>

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
