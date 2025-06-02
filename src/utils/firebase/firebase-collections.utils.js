import {doc, collection, getDocs, writeBatch, query, getDoc, setDoc, updateDoc, arrayUnion, where} from 'firebase/firestore';

import {firebaseApp, db} from "./firebase-basics.utils";


export const addCollectionToDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db);
    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
}

export const gatherAvailableTimes = async (bookingDate) => {
    const addedDay = bookingDate.setDate(bookingDate.getDate() + 1);
    const collectionRef = collection(db, 'bookings')
    const q = query(collectionRef, where('date', '>=', bookingDate),
        where('date', '<=', addedDay))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty){
        return null
    } else {
        return querySnapshot.docs.map(doc => doc.data());

    }

}


export const addToBookingsCollection = async (booking) => {


    const {hairstyleTitle, hairstyleImage, start, end, userId, name, userEmail, month, year, ...details} = booking;
    const appendedBooking = {
        invitee: {
            id: userId,
            name: name,
            email: userEmail
        },
        hairstyle:
            {
                title: hairstyleTitle,
                image: hairstyleImage
            },
        timeFrame: {
            year: year,
            month: month,
            start: start,
            end: end
        },
        details: details,

    }
    const bookingCollectionRef = doc(db, 'bookings', String(year));

    try {
        const bookingSnapshot = await getDoc(bookingCollectionRef);

        if (bookingSnapshot.exists()) {

            await updateDoc(bookingCollectionRef, {
                [month]: arrayUnion(appendedBooking)
            });
        } else {

            await setDoc(bookingCollectionRef, {
                [month]: arrayUnion(appendedBooking)
            });
        }
    } catch (error) {
        console.log('Error creating booking:', error.message);
        console.log(booking)
    }

    return bookingCollectionRef;
};

export const getBookingsForUserProfile = async (authId) => {
    const collectionRef = collection(db, 'bookings');
    const q = query(collectionRef, where('invitee.id', '==', authId))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map(doc => doc.data());

}


export const getCollectionAndDocuments = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const collectionMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return collectionMap;

}