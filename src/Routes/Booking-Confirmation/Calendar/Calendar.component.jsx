import './Calendar.styles.scss'

import CalenderHeader from "./Calender-Header/Calender-Header.component";
import {useState} from "react";
import CalendarTable from "./Calendar-Table/Calendar-Table.component";

import {getDaysInMonth, getStartDayOfWeek, months, daysOfWeek} from "../Booking-Confirmation.utils";
import TimeZone from "./Time-Zone/Time-Zone.component";

const CalendarCustom = ({chosenPeriods, setChosenPeriods}) => {

    const currentMonth = chosenPeriods.month
    const chosenYear = chosenPeriods.year


    const handleCurrentMonth = (direction) => {
        if (currentMonth !== 0) {
            if (direction === "forward") {
                setChosenPeriods({
                    ...chosenPeriods,
                    month: currentMonth + 1
                })
            } else if (currentMonth === 11 && direction === "forward") {
                setChosenPeriods({
                        month: 0,
                        year: chosenYear + 1
                    }
                )

            } else {
                setChosenPeriods({
                    ...chosenPeriods,
                    month: currentMonth - 1
                })
            }

        } else if (currentMonth === 0 && direction === 'back') {
            setChosenPeriods({
                    month: 11,
                    year: chosenYear - 1
                }
            )
        }

    }


    return (
        <div className={'custom-calender-container'}>
            <CalenderHeader chosenMonth={months[currentMonth].name} handleCurrentMonth={handleCurrentMonth}
                            chosenYear={chosenYear}/>
            <div className={'calendar-body'}>

                <CalendarTable daysOfWeek={daysOfWeek} daysInMonth={getDaysInMonth(chosenYear, currentMonth)}
                               startOfWeek={getStartDayOfWeek(chosenYear, currentMonth)}
                               chosenYear={chosenYear} currentMonth={currentMonth}/>

            </div>
            <TimeZone/>

        </div>


    )

}

export default CalendarCustom;