import './profile-navigation.styles.scss'
import {Link, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAddressCard, faCalendarAlt, faEnvelope, faHeart, faWallet
} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import {AuthContext} from "../../../Context/UserProvider.component";

const ProfileNavigation = () => {

    const {authData} = useContext(AuthContext)
    const {displayName, email, photoURL} = authData

    return (
        <div className={'profile-container'}>

                <div className={'profile-sidebar'}>
                    <nav className="profile-navigation">
                        <div>
                            <div className="profile-links-container none-hover">
                        <span className="profile-links">
                            <img src={photoURL} className={'firebase-profile-icon'} alt={displayName}/>
                            <p>{displayName}</p>
                        </span>
                            </div>
                        </div>

                        <div>
                            <div className="profile-links-container">
                                <Link className="profile-links" to="/profile/account">
                                    <FontAwesomeIcon icon={faAddressCard}/>
                                    Account
                                </Link>
                            </div>
                            <div className="profile-links-container">

                                <Link className="profile-links" to="/profile/bookings">
                                    <FontAwesomeIcon icon={faCalendarAlt}/>
                                    Bookings
                                </Link>
                            </div>
                            <div className="profile-links-container">
                                <Link className="profile-links" to="/profile/favourites">
                                    <FontAwesomeIcon icon={faHeart}/>
                                    Favourites
                                </Link>
                            </div>
                            <div className="profile-links-container">
                                <Link className="profile-links" to="/profile/inbox">
                                    <FontAwesomeIcon icon={faEnvelope}/>
                                    Inbox
                                </Link>
                            </div>
                            <div className="profile-links-container">
                                <Link className="profile-links" to="/profile/payment-methods">
                                    <FontAwesomeIcon icon={faWallet}/>
                                    Payment Methods
                                </Link>
                            </div>


                        </div>
                    </nav>


                </div>
            <div className={'profile-content-container'}>
                <Outlet/>


            </div>
        </div>
    )
}

export default ProfileNavigation;