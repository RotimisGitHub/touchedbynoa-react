import './Time-Selection.styles.scss'
import {useEffect, useState} from "react";

import TimeZone from "../../../General-Components/Calendar/Time-Zone/Time-Zone.component";
import {availableTimes} from '../../../General-Components/Calendar/Booking-Confirmation.utils'
import {gatherAvailableTimes} from '../../../utils/firebase/firebase-collections.utils'
import {useDispatch, useSelector} from "react-redux";
import {setChosenTime} from "../../../store/calendar/calendar.reducer";
import {selectCalendarReducer} from "../../../store/calendar/calendar.selector";

const TimeSelection = () => {

    const dispatch = useDispatch()
    const {date, duration} = useSelector(selectCalendarReducer)
    const [gatheredAvailableTimes, setAvailableTimes] = useState(availableTimes)


    const handleChosenTime = (event) => {
        const time = event.target.name.split(":").map(Number)

        dispatch(setChosenTime({time, date}))
    }



    const showAvailableTimes = async () => {
        const timesMap = await gatherAvailableTimes(new Date(date))
        let adjustedTimes;
        if (timesMap) {
            const timeRanges = timesMap.map(({timeframe}) => {
                const {start, end} = timeframe

                return {
                    startIndexes: availableTimes.findIndex(time => time === start.toLocaleTimeString()),
                    endIndexes: availableTimes.findIndex(time => time === end.toLocaleTimeString())
                }
            })

            // Sort ranges in reverse to splice from the end
            const sortedRanges = timeRanges.sort((a, b) => b.startIndex - a.startIndex);


            adjustedTimes = [...availableTimes];

            for (let { startIndex, endIndex } of sortedRanges) {
                if (startIndex !== -1 && endIndex !== -1) {
                    adjustedTimes.splice(startIndex, endIndex - startIndex);
                }
            }


        } else {
            adjustedTimes = availableTimes
        }
        return adjustedTimes;


    }


    useEffect(() => {
        const fetchTimes = async () => {
            const result = await showAvailableTimes();
            setAvailableTimes(result);
        };

        fetchTimes();
    }, [date]);



    return (
        <div className={'time-selection-container'}>
            <div className={'time-selection-header'}>
                <TimeZone/>
                <div className={'user-selected-date'}>
                    <div className={'time-selection-cta'}>
                        <h2>Select a Preferred Time</h2>
                        <span>Approx. Duration: {duration ?? '4 Hours'} Hours</span>
                    </div>
                </div>


            </div>
            <div className={'time-selection-body'}>
                {
                    gatheredAvailableTimes.map((time, index) => {
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