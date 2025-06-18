import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "touchedbynoasite-abc5f.firebaseapp.com",
    projectId: "touchedbynoasite-abc5f",
    storageBucket: "touchedbynoasite-abc5f.firebasestorage.app",
    messagingSenderId: "1012240440739",
    appId: "1:1012240440739:web:046ffccc6be407ca8f8e16"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Firestore Database
export const db = getFirestore()