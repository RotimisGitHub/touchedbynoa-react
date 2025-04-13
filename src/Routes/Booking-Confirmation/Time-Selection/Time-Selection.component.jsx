import './Time-Selection.styles.scss'
import {useContext} from "react";
import {CalendarContext} from "../../../Context/CalendarProvider.component";
import TimeZone from "../Calendar/Time-Zone/Time-Zone.component";
import {availableTimes} from '../Booking-Confirmation.utils'

const TimeSelection = () => {

    const hairstyleMockDuration = {
        duration: 4,
        bufferTime: 45
    }
    const {fullDateVariable, setFullDateVariable} = useContext(CalendarContext)

    const handleChosenTime = (event) => {
        const [hours, minutes, seconds] = event.target.name.split(":").map(Number);


        setFullDateVariable(prev => ({
            ...prev,
            pageState: prev.pageState + 1,
            date: String(new Date(prev.date.setHours(hours, minutes, seconds)))
        }));


    };


    return (
        <div className={'time-selection-container'}>
            <div className={'time-selection-header'}>
                <TimeZone/>
                <div className={'user-selected-date'}>
                    <div className={'time-selection-cta'}>
                        <h2>Select a Preferred Time</h2>
                        <span>Approx. Duration: {hairstyleMockDuration.duration} Hours</span>
                    </div>
                </div>


            </div>
            <div className={'time-selection-body'}>
                {
                    availableTimes.map((time, index) => {
                        return (
                            <button key={index} type={'button'} className={'time-selection-button'} name={time}
                                    onClick={handleChosenTime}>
                                {time}
                            </button>
                        )
                    })
                }

            </div>
        </div>


    )
}

export default TimeSelection;