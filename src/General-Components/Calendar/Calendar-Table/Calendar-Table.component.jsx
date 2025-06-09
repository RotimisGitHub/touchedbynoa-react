import './Calendar-Table.styles.scss'
import {useRef, useState} from "react";

import {
    daysOfWeek,
    getDaysInMonth,
    getStartDayOfWeek
} from "../Booking-Confirmation.utils";
import {useDispatch, useSelector} from "react-redux";
import {setChosenDate} from "../../../store/calendar/calendar.reducer";
import {selectCalendarReducer} from "../../../store/calendar/calendar.selector";


const CalendarTable = () => {
    const dispatch = useDispatch()

    const [isSelected, setSelected] = useState(null)
    const calendarBodyRef = useRef(null)



    const {initialYear, initialMonth} = useSelector(selectCalendarReducer)
    const [chosenYear, currentMonth] = [initialYear, initialMonth]

    const daysInMonth = getDaysInMonth(chosenYear, currentMonth);
    const startOfMonth = getStartDayOfWeek(chosenYear, currentMonth);
    const date = {
        firstWeek: 0,
        remainingValues: 7 - startOfMonth
    };


    const handleChosenDate = (chosenDate) => {
        setSelected(chosenDate)
        dispatch(setChosenDate([chosenYear, currentMonth, chosenDate]))
    }


    return (
        <div className={'table-responsive'}>
        <table>
            <thead>
            <tr>
                {daysOfWeek.map((day, index) => (
                    <th key={index} className="calendar-table-header">
                        {day.shortName}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody ref={calendarBodyRef}>
            <tr id={'first-week-row'}>
                {

                    Array.from({length: 7}).map((_, index) => {

                        if (index >= startOfMonth) {
                            date.firstWeek++
                        }
                        return (
                            <td>
                                {
                                    date.firstWeek === 0 ? '' : (
                                        <span
                                            title={date.firstWeek}
                                            onClick={() => handleChosenDate(date.firstWeek)}
                                            className={isSelected === date.firstWeek ? 'selected-date' : ''}
                                        >
                                            {date.firstWeek}
                                        </span>
                                    )
                                }

                            </td>

                        )
                    })
                }
            </tr>
            {

                Array.from({length: 4}).map((_, row) => {
                    return (
                        <tr key={row}>
                            {
                                Array.from({length: 7}).map((_, column) => {
                                    if (date.remainingValues >= daysInMonth || date.remainingValues === '') {
                                        date.remainingValues = '';
                                    } else {
                                        date.remainingValues++
                                    }


                                    return (
                                        <td key={column}>
                                            {
                                                date.remainingValues === '' ? '' : (
                                                    <span
                                                        title={date.remainingValues}
                                                        onClick={() => handleChosenDate(date.remainingValues)}
                                                        className={isSelected === date.remainingValues ? 'selected-date' : ''}
                                                    >
                                            {date.remainingValues}
                                        </span>
                                                )
                                            }


                                        </td>
                                    );
                                })
                            }
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
        </div>
    )
}

export default CalendarTable;