import {doc, collection, getDocs, writeBatch, query, getDoc, setDoc, updateDoc, arrayUnion} from 'firebase/firestore';

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

export const addToBookingsCollection = async (booking) => {


    const {hairstyleTitle, hairstyleImage, userId, name, userEmail, month, year, ...details} = booking;
    const bookingCollectionRef = doc(db, 'bookings', String(year));

    try {
        const bookingSnapshot = await getDoc(bookingCollectionRef);

        if (bookingSnapshot.exists()) {

            await updateDoc(bookingCollectionRef, {
                [month]: arrayUnion({
                    invitee: {
                        id: userId,
                        name: name,
                    },
                    details: details,
                    hairstyle:
                        {
                            title: hairstyleTitle,
                            image: hairstyleImage
                        }

                })
            });
        } else {

            await setDoc(bookingCollectionRef, {
                [month]: arrayUnion({
                    invitee: {
                        id: userId,
                        name: name,
                    },
                    details: details,
                    hairstyle:
                        {
                            title: hairstyleTitle,
                            image: hairstyleImage
                        }

                })
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
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)

    let userBookings = [];

    querySnapshot.forEach(docSnapshot => {
        const data = docSnapshot.data();
        const months = Object.keys(data)

        let eachMonth = []
        months.forEach(month => {
            eachMonth = [...eachMonth, data[month]]
            return (
                eachMonth
            )

        })

        eachMonth = eachMonth.flatMap(entry => entry)


        const userSpecificBookings = eachMonth.filter(
            booking => booking.invitee.id === authId
        );

        userBookings = [...userBookings, ...userSpecificBookings];
    });

    return userBookings;
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