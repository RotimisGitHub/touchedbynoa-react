import '../../../General-Components/Dashboard-Styling/Dashboard.styles.scss'
import {Link, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressCard, faCalendarAlt, faEnvelope, faHeart, faWallet
} from "@fortawesome/free-solid-svg-icons";

import {useSelector} from "react-redux";
import {selectUserSlice} from "../../../store/user/user.selector";

const ProfileNavigation = () => {

    const currentUser = useSelector(selectUserSlice);
    const {displayName, photoURL} = currentUser

    return (
        <div className={'dashboard-container'}>

            <div className={'dashboard-sidebar'}>
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
                            <Link className="dashboard-links" to="/profile/account">
                                <FontAwesomeIcon icon={faAddressCard}/>
                                Account
                            </Link>
                        </div>
                        <div className="dashboard-links-container">

                            <Link className="dashboard-links" to="/profile/bookings">
                                <FontAwesomeIcon icon={faCalendarAlt}/>
                                Bookings
                            </Link>
                        </div>
                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/profile/favourites">
                                <FontAwesomeIcon icon={faHeart}/>
                                Favourites
                            </Link>
                        </div>
                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/profile/inbox">
                                <FontAwesomeIcon icon={faEnvelope}/>
                                Inbox
                            </Link>
                        </div>
                        <div className="dashboard-links-container">
                            <Link className="dashboard-links" to="/profile/payment-methods">
                                <FontAwesomeIcon icon={faWallet}/>
                                Payment Methods
                            </Link>
                        </div>


                    </div>
                </nav>


            </div>
            <div className={'dashboard-content-container'}>
                <Outlet/>


            </div>
        </div>
    )
}

export default ProfileNavigation;