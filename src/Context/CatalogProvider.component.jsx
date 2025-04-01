import {createContext, useEffect, useState} from "react";
import {getCollectionAndDocuments, addCollectionToDocuments} from '../utils/firebase/firebase-collections.utils'

export const CatalogContext = createContext({
    products: [],
})

const CatalogProvider = ({children}) => {


    const [hairstyles, setHairstyles] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCollectionAndDocuments();
            setHairstyles(categories)
        }

        getCategories()
    }, []);

    // useEffect(() => {
    //     const setCategories = async () => {
    //         await addCollectionToDocuments('Hairstyles', hairstyles);
    //     }
    //
    //     setCategories()
    // }, []);

    // This Event Handler Retrieves User Data from Firebase and sets it into the Context that is now available
    // Across the Application

    const handleShopData = (data) => {
        setHairstyles(data);
    }


    return (
        <CatalogContext.Provider value={{hairstyles, handleShopData}}>
            {children}
        </CatalogContext.Provider>

    )
}

export default CatalogProvider;