import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "touchedbynoasite-abc5f.firebaseapp.com",
    projectId: "touchedbynoasite-abc5f",
    storageBucket: "touchedbynoasite-abc5f.firebasestorage.app",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Firestore Database
export const db = getFirestore()