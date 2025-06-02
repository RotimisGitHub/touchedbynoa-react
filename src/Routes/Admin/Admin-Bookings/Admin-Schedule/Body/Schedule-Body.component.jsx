import './Schedule-Body.styles.scss'
import {useSelector} from "react-redux";

const ScheduleBody = ({weekObject}) => {
    const {bookings} = useSelector((state) => state.analytics)

    const scheduleDestructured = weekObject.map(({dateNumber}, index) => {


        const filteredBookings = bookings.filter(({details}) => {
            const bookingDay = new Date(details.date).getDay()
            const bookingDate = new Date(details.date).getDate()

            return bookingDay === index && bookingDate === dateNumber.getDate()

        })

        if (filteredBookings.length > 0) {
            return filteredBookings

        } else {
            return null

        }

    });

    console.log(scheduleDestructured)

    const handleTD = (bookings) => {

        let bookingOutput;

        if (Array.isArray(bookings)) {
            bookingOutput = bookings.map(({details, hairstyle, invitee}) => {
                const bookingHour = new Date(details?.date).getHours()
                const bookingMinutes = new Date(details?.date).getMinutes()
                const bookingTime = `${bookingHour}${bookingMinutes === 0 ? '' : ':' + bookingMinutes}${bookingHour > 11 ? 'pm' : 'am'}`
                return (
                    <div className={'schedule-booking-cell'}>
                        <h3>Time</h3>
                        <span>{bookingTime}</span>
                        <h3>Hairstyle</h3>
                        <span>{hairstyle?.title}</span>
                        <h3>Invitee</h3>
                        <span>{invitee?.name}</span>
                        <h3>Invitee Email</h3>
                        <span>{invitee?.email}</span>
                    </div>
                );
            })

        } else {
            bookingOutput = <div></div>;
        }

        return bookingOutput;


    }


    return (
        <div className={'schedule-body-container'}>
            <table>
                <thead>
                <tr>
                    {weekObject.map(({dayName, dateNumber}, index) => (
                        <th key={index} className="calendar-table-header"
                            id={`header-${index}`}>

                            <span>{dateNumber.getDate()}</span>
                            <br/>
                            <span>{dayName}</span>

                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                    {
                        scheduleDestructured.map((bookings, index) => {
                            const bookingsMap = handleTD(bookings);
                            return (
                                <td key={index}>
                                    {Array.isArray(bookingsMap)
                                        ? bookingsMap.map((entry, i) => <div key={i} className={'schedule-booking'}>{entry}</div>)
                                        : bookingsMap}
                                </td>
                            );
                        })
                    }

                </tr>
                </tbody>
            </table>

        </div>
    )

}

export default ScheduleBody;