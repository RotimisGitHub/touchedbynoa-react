import './Penultimate-Confirmation.styles.scss'
import TimeZone from "../Calendar/Time-Zone/Time-Zone.component";
import {useContext, useState} from "react";
import {CalendarContext} from "../../../Context/CalendarProvider.component";
import ProgressiveButton from "../../../General-Components/Buttons/ProgressiveButton.component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarWeek, faLocation, faStopwatch, faUserClock} from "@fortawesome/free-solid-svg-icons";
import SizeSelection from "./Size-Selection/Size-Selection.component";
import {addToBookingsCollection} from '../../../utils/firebase/firebase-collections.utils'

const PenultimateConfirmation = ({selectedSizes, handleSelectedSizes, completeBookingData, setActiveModal}) => {
    const {fullDateVariable} = useContext(CalendarContext)

    const [completeScheduling, setCompleteScheduling] = useState(false)

    const handleCompleteScheduling = async () => {

        const completeBooking = await addToBookingsCollection(completeBookingData)
        if (completeBooking) {
            setCompleteScheduling(true)
            setActiveModal('close')
        }
    }

    const hairstyleMockDuration = {
        duration: 4,
        bufferTime: 45
    }


    return (
        <div className={'pc-container'}>
            <div className={'pc-header'}>
                <TimeZone/>
                <div className={'pc-selected-date'}>

                    <div className={'pc-selected-times'}>
                        <span><FontAwesomeIcon icon={faCalendarWeek}/> {fullDateVariable.date?.toLocaleString()}</span>
                        <span><FontAwesomeIcon icon={faUserClock}/> {fullDateVariable.time?.toLocaleString()}</span>
                        <span><FontAwesomeIcon icon={faStopwatch}/> {hairstyleMockDuration.duration} Hours</span>
                        <span><FontAwesomeIcon icon={faLocation}/> Location Will Be Emailed When Booking Confirmed</span>
                    </div>
                </div>
            </div>
            <div className={'pc-body'}>
                <SizeSelection selectedSizes={selectedSizes} handleSelectedSizes={handleSelectedSizes}/>

                <span>
                    By proceeding, you confirm that you have read and agree to
                    TouchByNoa's Terms of Use and Privacy Notice.
                </span>
                <ProgressiveButton type={'button'} disabled={!(selectedSizes.length && selectedSizes.thickness)}
                onClickHandler={handleCompleteScheduling}>
                    Schedule Appointment
                </ProgressiveButton>

            </div>
        </div>
    )
}

export default PenultimateConfirmation;