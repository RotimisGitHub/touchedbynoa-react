import './Penultimate-Confirmation.styles.scss'
import TimeZone from "../../../General-Components/Calendar/Time-Zone/Time-Zone.component";
import ProgressiveButton from "../../../General-Components/Buttons/ProgressiveButton.component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarWeek, faLocation, faStopwatch, faUserClock} from "@fortawesome/free-solid-svg-icons";
import SizeSelection from "./Size-Selection/Size-Selection.component";
import {addToBookingsCollection} from '../../../utils/firebase/firebase-collections.utils'
import {useSelector} from "react-redux";
import {selectCalendarReducer} from "../../../store/calendar/calendar.selector";
import {selectUserSlice} from "../../../store/user/user.selector";

const PenultimateConfirmation = ({completeBookingData, setActiveModal}) => {
    const {date, time, hairstyleDuration, selectedSizes} = useSelector(selectCalendarReducer)
    const currentUser = useSelector(selectUserSlice);

    const handleCompleteScheduling = async () => {

        const completeBooking = await addToBookingsCollection(completeBookingData)
        if (completeBooking) {
            setActiveModal('close')

            try {

                const checkoutResponse = await fetch('/create-checkout-session', {method: 'POST', body: JSON.stringify({email: currentUser.email})})

                const session = await checkoutResponse.json()
                if (session.url) {
                    window.location.href = session.url;
                } else {
                    console.error("Stripe session URL not found:", session);
                }

                await fetch('/api/booking-page', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        currentUser: currentUser.email,
                        name: currentUser.displayName,
                        ...completeBookingData
                    }),
                });

            } catch (error) {
                console.error("Error during checkout or booking:", error);
            }


        }
    }
    return (
        <div className={'pc-container'}>
            <div className={'pc-header'}>
                <TimeZone/>

                <div className={'pc-selected-times'}>
                    <span><FontAwesomeIcon icon={faCalendarWeek}/> {date.toLocaleString()}</span>
                    <span><FontAwesomeIcon icon={faUserClock}/> {time}</span>
                    <span><FontAwesomeIcon icon={faStopwatch}/> {hairstyleDuration} Hours</span>
                    <span><FontAwesomeIcon icon={faLocation}/> Location Will Be Emailed When Booking Confirmed</span>
                </div>

            </div>
            <div className={'pc-body'}>
                <SizeSelection/>

                <span>
                    By proceeding, you confirm that you have read and agree to
                    TouchByNoa's Terms of Use and Privacy Notice.
                </span>


                <ProgressiveButton type={'button'} disabled={!(selectedSizes?.length && selectedSizes?.thickness)}
                                   onClickHandler={handleCompleteScheduling}>
                    Schedule Appointment
                </ProgressiveButton>

            </div>
        </div>
    )
}

export default PenultimateConfirmation;