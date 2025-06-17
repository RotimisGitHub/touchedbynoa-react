import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';

import {doc, getDoc, setDoc, collection, getDocs} from 'firebase/firestore';

// eslint-disable-next-line no-unused-vars
import {firebaseApp, db} from "./firebase-basics.utils";


// Used To Create an Account within our Application, using Google Sign-In, Via Firebase.
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({prompt: 'select_account'})
const auth = getAuth()


// Enables Users to sign in with their Google Account
export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);


// Creates a User in the 'users' collection in Firebase Database. If it doesn't exist already in the database

export const createUserDocument = async (userObject) => {
    const userDocRef = doc(db, 'users', userObject.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const {displayName, email} = userObject;
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {displayName, email, createdAt, role: 'customer'})
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userDocRef
}

// Used to Create a User with the traditional, Email and Password

export const createAuthUserWithEnP = async (emailInput, password, displayName) => {
    if (!emailInput || !password) return;
    const response = await createUserWithEmailAndPassword(auth, emailInput, password)
    const {uid, email} = response.user;

    const userDocRef = doc(db, 'users', uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        try {
            const createdAt = new Date()
            await setDoc(userDocRef, {displayName, email, createdAt})
            return userDocRef

        } catch (error) {
            console.log('error creating user', error.message)
        }

    } else {
        return false
    }

}

export const obtainInformationFromDB = async (field, userInputData) => {
    try {
        const database =  await getDocs(collection(db, "users"))
        const matches = database.docs.filter(doc => doc.data()[field] === userInputData.email);
        return matches.length >= 1;
    } catch (error){
        console.log(error)
        return false
    }


}

export const logInWithEnP = async (email, password) => {
    try {
        if (!email || !password) return;
        return await signInWithEmailAndPassword(auth, email, password)

    } catch (error){

        console.log(error)
        return false
    }
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    if (!callback) return;
    return onAuthStateChanged(auth, callback);
}

export const retrieveUserRole = async (user) => {
    const userSnapshot =  await getDoc(doc(db, "users", user.uid))
    if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        return userData.role;
    } else {
        console.log('No user data found in Firestore');
        return null;
    }
}