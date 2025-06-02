import './Admin-Bookings.styles.scss'
import {useState} from "react";
import ScheduleHeader from "./Admin-Schedule/Header/Schedule-Header.component";
import ScheduleBody from "./Admin-Schedule/Body/Schedule-Body.component";
import {daysOfWeek} from "../../../General-Components/Calendar/Booking-Confirmation.utils";

const AdminBookings = () => {
    const currentDateNumber = new Date().getDate()
    const currentDay = new Date().getDay()

    const [disableScrolling, setDisableScrolling] = useState(false)
    const [disableBackScrolling, setDisableBackScrolling] = useState(true)
    const weekObject = daysOfWeek.map(({name}, index) => {
        const dateNumber = new Date();
        dateNumber.setDate((currentDateNumber - currentDay) + index)
        return (

            {
                dayName: name,
                dateNumber: dateNumber,
            }
        )
    })

    const [chosenWeek, setChosenWeek] = useState(weekObject)


    const handleCurrentWeek = (direction) => {

        if (direction === 'back') {
            setDisableBackScrolling(true);
            setDisableScrolling(false);
            setChosenWeek(weekObject)


        } else if (direction === 'forward') {
            setDisableBackScrolling(false);
            setDisableScrolling(true);
            setChosenWeek(prevWeek => {
                return prevWeek.map(({ dayName, dateObject }) => {
                    const newDate = new Date(dateObject);
                    newDate.setDate(newDate.getDate() + 7); // move forward by 7 days
                    return {
                        dayName,
                        dateObject: newDate,
                    };
                });
            });
        }

    };

    return (
        <div className={'admin-bookings-container'}>
            <ScheduleHeader disableScrolling={disableScrolling} disableBackScrolling={disableBackScrolling}
                            handleCurrentWeek={handleCurrentWeek} chosenWeek={chosenWeek}/>
            <ScheduleBody weekObject={chosenWeek}/>

        </div>
    )
}

export default AdminBookings;