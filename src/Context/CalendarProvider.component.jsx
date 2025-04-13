import {createContext, useState} from "react";


export const CalendarContext = createContext({
    fullDateVariable: {
        pageState: 0,
        date: null,
        time: null,
        hairstyleTitle: null,
        hairstyleImage: null
    },
    setFullDateVariable: () => {}
});

const CalendarProvider = ({children}) => {


    const [fullDateVariable, setFullDateVariable] = useState(
        {
            pageState: 0,
            date: null,
            hairstyleTitle: null,
            hairstyleImage: null
        }
    )





    return (
        <CalendarContext.Provider value={{fullDateVariable, setFullDateVariable}}>
            {children}
        </CalendarContext.Provider>

    )
}

export default CalendarProvider;