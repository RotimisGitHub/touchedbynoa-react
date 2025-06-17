import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import './Calender-Header.styles.scss'
import {useState} from "react";
import {months} from "../Booking-Confirmation.utils";
import {useDispatch, useSelector} from "react-redux";
import {setMonthAndYear} from "../../../store/calendar/calendar.reducer";
import {selectCalendarReducer} from "../../../store/calendar/calendar.selector";

const CalenderHeader = () => {
    const dispatch = useDispatch()
    const {initialYear, initialMonth} = useSelector(selectCalendarReducer)
    const [chosenYear, currentMonth] = [initialYear, initialMonth]
    const chosenMonth = months[currentMonth];

    const [scrolling, setScrolling] = useState({
        forward: true,
        back: false
    })
    const {forward, back} = scrolling


    const handleCurrentMonth = (direction) => {
        let newMonth = currentMonth;
        let newYear = chosenYear;

        if (direction === "forward") {
            if (currentMonth === 11) {
                newMonth = 0;
                newYear += 1;
            } else {
                newMonth += 1;
            }
        } else if (direction === "back") {
            if (currentMonth === 0) {
                newMonth = 11;
                newYear -= 1;
            } else {
                newMonth -= 1;
            }
        }

        // Update calendar store year and month with new values
        dispatch(setMonthAndYear({newMonth, newYear}))
        // Check scrolling condition
        const monthDiff = (newYear - initialYear) * 12 + (newMonth - initialMonth);
        setScrolling({
            forward: monthDiff >= 2,
            back: currentMonth === initialMonth
        })
    };

    return (
        <div className={'calendar-header'}>
                <span className={'month-change-span'}>
                {
                    back &&
                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleCurrentMonth('back')}/>
                }
                </span>

            <span className={'month-name'}>{chosenMonth.name} {chosenYear}</span>


            <span className={'month-change-span'}>
                {
                    forward &&
                    <FontAwesomeIcon icon={faChevronRight} onClick={() => handleCurrentMonth('forward')}/>
                }


                </span>

        </div>
    )
}

export default CalenderHeader;