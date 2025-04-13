import {createContext, useContext, useEffect, useState} from "react";
import {onAuthStateChangedListener, createUserDocument} from '../utils/firebase/firebase-users.utils'
import {getBookingsForUserProfile} from '../utils/firebase/firebase-collections.utils'
import {CalendarContext} from "./CalendarProvider.component";

export const AuthContext = createContext(null)

const UserProvider = ({children}) => {
    const {setFullDateVariable} = useContext(CalendarContext)


    const [authData, setAuthData] = useState(null)

    // This Event Handler Retrieves User Data from Firebase and sets it into the Context that is now available

    // Across the Application

    const handleAuthData = (displayName, email) => {
        setAuthData({
            ...authData,
            displayName,
            email
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(async (user) => {
            if (user) {

                await createUserDocument(user);

                setAuthData(user);
            } else {
                // Reset context if user logs out
                setAuthData(null);
            }
        });

        return unsubscribe;
    }, []);





    return (
        <AuthContext.Provider value={{authData, handleAuthData}}>
            {children}
        </AuthContext.Provider>

    )
}

export default UserProvider;