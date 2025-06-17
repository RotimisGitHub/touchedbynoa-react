import './Booking-Page.styles.scss'
import CalendarCustom from "../../General-Components/Calendar/Calendar.component";
import TimeSelection from "./Time-Selection/Time-Selection.component";
import PenultimateConfirmation from "./Penultimate-Confirmation/Penultimate-Confirmation.component";
import { v4 as uuidv4 } from 'uuid';
import {useSelector} from "react-redux";

const BookingPage = ({handleModal}) => {


    const {selectedSizes, hairstyleDuration, hairstyleTitle, hairstyleImage, newYear, newMonth, pageState, appointmentTime} = useSelector(state => state.calendar)
    const currentUser = useSelector((state) => state.user);


    const completeBookingData = {
        event_uuid: uuidv4(),
        name: currentUser?.displayName,
        userEmail: currentUser?.email,
        userId: currentUser?.uid,
        start: appointmentTime.start,
        end: appointmentTime.end,
        length: selectedSizes?.length,
        thickness: selectedSizes?.thickness,
        hairstyleTitle: hairstyleTitle,
        hairstyleImage: hairstyleImage,
        duration: hairstyleDuration,
        year: newYear,
        month: newMonth

    }

    const componentStates = [
        <CalendarCustom/>, <TimeSelection/>, <PenultimateConfirmation completeBookingData={completeBookingData} setActiveModal={handleModal}/>
    ]


    return (
        <div className={'booking-page-parent'}>
            <div className={'booking-page-container'}>

                <div className={'booking-page-content'}>
                {
                    componentStates[pageState]
                }
                </div>
            </div>
        </div>


    )

}

export default BookingPage;