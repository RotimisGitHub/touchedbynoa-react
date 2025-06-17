import {collection, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "./firebase-basics.utils";

export const getFilteredBookings = async (filter, chosenFilter) => {
    const collectionRef = collection(db, 'bookings');
    let q;

    if (filter === 'time') {
        q = query(
            collectionRef,
            where('timeFrame.year', '==', chosenFilter[0]),
            where('timeFrame.month', '==', chosenFilter[1])
        );
    } else if (filter === 'user') {
        q = query(
            collectionRef,
            where('invitee.email', '==', chosenFilter)
        );
    } else if (filter === 'hairstyle') {
        q = query(
            collectionRef,
            where('hairstyle.title', '==', chosenFilter)
        );
    } else {
        throw new Error('Unknown filter: ' + filter);
    }

    const querySnapshot = await getDocs(q)

    const bookings = querySnapshot.docs.map(doc => doc.data());
    return bookings;

}


const getDashboardStats = async (collectionName) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    const pureData = querySnapshot.docs.map(snapshot => snapshot.data())

    return pureData

}

export const retrieveAllStats = async () => {
    const [bookings, hairstyles, users] = await Promise.all([
        getDashboardStats('bookings'),
        getDashboardStats('Hairstyles'),
        getDashboardStats('users'),
    ]);

    return {
        bookings,
        hairstyles,
        users,
    };

}

export const editHairstyle = async (hairstyleId, updatedData) => {
    const collectionRef = collection(db, 'Hairstyles');
    const q = query(collectionRef, where('items.id', '==', hairstyleId))
    const querySnapshot = await getDocs(q)

    try {
        if (!querySnapshot.empty) {
            let items;
            let index;
            let docSnapshot;

            for (const snapshot of querySnapshot.docs) {
                const docData = snapshot.data();
                const currentItems = docData.items;

                const foundIndex = currentItems.findIndex(item => item.id === hairstyleId);
                if (foundIndex !== -1) {
                    items = currentItems;
                    index = foundIndex;
                    docSnapshot = snapshot;
                    break;
                }
            }

            if (index !== -1) {
                items[index] = {
                    ...items[index],
                    ...updatedData
                };
            } else {

                console.warn('Hairstyle not found in items array.');
            }


            await updateDoc(docSnapshot.ref, {
                items: items
            });


        }


    } catch (error) {
        console.log('Error editing Hairstyle:', error.message);
        console.log(hairstyleId)
    }

    return querySnapshot.docs

}