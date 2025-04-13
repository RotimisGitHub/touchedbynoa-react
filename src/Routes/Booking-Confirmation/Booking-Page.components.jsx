import './Booking-Page.styles.scss'
import {useState, useContext} from "react";
import CalendarCustom from "./Calendar/Calendar.component";
import TimeSelection from "./Time-Selection/Time-Selection.component";
import {CalendarContext} from "../../Context/CalendarProvider.component";
import PenultimateConfirmation from "./Penultimate-Confirmation/Penultimate-Confirmation.component";
import {AuthContext} from "../../Context/UserProvider.component";
import { v4 as uuidv4 } from 'uuid';

const BookingPage = ({handleModal}) => {

    const {fullDateVariable} = useContext(CalendarContext)
    const {authData} = useContext(AuthContext)
    const presentMonth = new Date().getMonth()
    const presentYear = new Date().getFullYear()

    const [selectedSizes, setSelectedSizes] = useState({
        length: null,
        thickness: null
    })


    const [chosenPeriods, setChosenPeriods] = useState({
        year: presentYear,
        month: presentMonth
    })


    const handleSelectedSizes = (type, value) => {
        setSelectedSizes(prev => ({
            ...prev,
            [type]: value
        }));
    }

    const completeBookingData = {
        event_uuid: uuidv4(),
        name: authData?.displayName,
        userEmail: authData?.email,
        userId: authData?.uid,
        date: fullDateVariable?.date,
        length: selectedSizes?.length,
        thickness: selectedSizes?.thickness,
        hairstyleTitle: fullDateVariable?.hairstyleTitle,
        hairstyleImage: fullDateVariable?.hairstyleImage,
        year: chosenPeriods?.year,
        month: new Date(chosenPeriods?.year, chosenPeriods?.month).toLocaleString('default', { month: 'long' })

    }

    const componentStates = [
        <CalendarCustom chosenPeriods={chosenPeriods} setChosenPeriods={setChosenPeriods}/>, <TimeSelection/>, <PenultimateConfirmation selectedSizes={selectedSizes} handleSelectedSizes={handleSelectedSizes} completeBookingData={completeBookingData} setActiveModal={handleModal}/>
    ]


    return (
        <div className={'booking-page-parent'}>
            <div className={'booking-page-container'}>

                <div className={'booking-page-content'}>
                {
                    componentStates[fullDateVariable.pageState]
                }
                </div>
            </div>
        </div>


    )

}

export default BookingPage;