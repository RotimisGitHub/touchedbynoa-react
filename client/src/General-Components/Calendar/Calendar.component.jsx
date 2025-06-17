import './Calendar.styles.scss'
import CalenderHeader from "./Calender-Header/Calender-Header.component";
import CalendarTable from "./Calendar-Table/Calendar-Table.component";
import TimeZone from "./Time-Zone/Time-Zone.component";


const CalendarCustom = () => {


    return (
        <div className={'custom-calender-container'}>
            <CalenderHeader/>
            <div className={'calendar-body'}>

                <CalendarTable/>

            </div>
            <TimeZone/>

        </div>


    )

}

export default CalendarCustom;