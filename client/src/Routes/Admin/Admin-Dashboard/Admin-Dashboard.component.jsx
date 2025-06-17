import './Admin-Dashboard.styles.scss'
import AdminCells from "../Admin-Cells/admin-cells.component";
import {faCalendarWeek, faUsers, faMessage, faScissors, faComments, faEye} from "@fortawesome/free-solid-svg-icons";
import CalendarCustom from "../../../General-Components/Calendar/Calendar.component";
import {useSelector} from "react-redux";
import {selectUserSlice} from "../../../store/user/user.selector";

const AdminDashboard = () => {
    const currentUser = useSelector(selectUserSlice);
    const {displayName} = currentUser
    const analytics = useSelector((state) => state.analytics)
    const {bookings, hairstyles, users} = analytics



    const cellTypes = [
        {
            name: 'Messages',
            quantity: 12,
            icon: faMessage
        },
        {
            name: 'Bookings',
            quantity: Object.values(bookings[0]).flat().length,
            icon: faCalendarWeek
        },
        {
            name: 'Users',
            quantity: users.length,
            icon: faUsers
        }
    ]

    const styles = hairstyles.map(key => key.items)

    const websiteOverview = [{
        name: 'Services',
        quantity: styles.flatMap(style => style).length,
        icon: faScissors,
    },
        {
            name: 'Reviews',
            quantity: 35,
            icon: faComments
        },
        {
            name: 'Visits',
            quantity: 206,
            icon: faEye
        }
    ]

    return (
        <div className={'admin-dashboard-container'}>
            <div className={'dashboard-main-cell'}>
                <div className={'admin-cell-container'}>
                    <p><strong>Welcome to Dashboard</strong><br/>
                        Hello {displayName}, Welcome to your dashboard!</p>

                </div>
            </div>


            <div className={'dashboard-main-cell'}>
                {cellTypes.map(cellType => <AdminCells cellType={cellType}/>)}

            </div>

            <div className={'dashboard-main-cell'}>
                <div className={'dashboard-calender-overview'}>
                    <CalendarCustom />

                </div>
            </div>
            <div className={'dashboard-main-cell'}>
                {websiteOverview.map((overview, index) => <AdminCells key={index} cellType={overview}/>)}
            </div>
            <div className={'dashboard-main-cell'}>
                <div className={'dashboard-analytics-overview'}>

                </div>
            </div>

        </div>
    )
}

export default AdminDashboard;