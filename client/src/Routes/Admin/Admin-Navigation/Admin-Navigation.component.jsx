import '../../../General-Components/Dashboard-Styling/Dashboard.styles.scss'
import './Admin-Navigation.styles.scss'
import {Link, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt, faChartLine, faGear, faHome,
    faScissors, faUsers, faUsersGear
} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {selectUserSlice} from "../../../store/user/user.selector";

const AdminNavigation = () => {
    const currentUser = useSelector(selectUserSlice);
    console.log(currentUser)
    const {displayName, photoURL} = currentUser
    const analytics = useSelector((state) => state.analytics)
    const pageYOffset = analytics.yOffset ? 'scroll' : 'hidden';



    return (
        <div className={'dashboard-container'}>

            <div className={'admin-sidebar'}>
                <nav className="dashboard-navigation">
                    <div>
                        <div className="dashboard-links-container none-hover">
                        <span className="dashboard-links">
                            <img src={photoURL} className={'firebase-profile-icon'} alt={displayName}/>
                            <p>{displayName}</p>
                        </span>
                        </div>
                    </div>

                    <div>
                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/admin/dashboard">
                                <FontAwesomeIcon icon={faHome}/>
                                Dashboard
                            </Link>
                        </div>
                        <div className="dashboard-links-container">

                            <Link className="dashboard-links" to="/admin/bookings">
                                <FontAwesomeIcon icon={faCalendarAlt}/>
                                Bookings
                            </Link>
                        </div>
                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/admin/content-management">
                                <FontAwesomeIcon icon={faScissors}/>
                                Content Management
                            </Link>
                        </div>
                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/admin/analytics">
                                <FontAwesomeIcon icon={faChartLine}/>
                                Analytics
                            </Link>
                        </div>


                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/admin/staff-management">
                                <FontAwesomeIcon icon={faUsersGear}/>
                                Staff Management
                            </Link>
                        </div>
                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/admin/client-management">
                                <FontAwesomeIcon icon={faUsers}/>
                                Client Management
                            </Link>
                        </div>

                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/admin/settings">
                                <FontAwesomeIcon icon={faGear}/>
                                Settings
                            </Link>
                        </div>


                    </div>
                </nav>


            </div>
            <div className={'admin-content-container'} style={
                {
                    overflowY: pageYOffset
                }
            }>
                <Outlet/>


            </div>
        </div>
    )
}

export default AdminNavigation;