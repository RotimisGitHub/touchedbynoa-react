import {Fragment, useContext} from "react";
import {Outlet, Link} from "react-router-dom";
import "./navigation.styles.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScissors, faCalendarAlt, faUser, faCircleUser} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "../../Context/UserProvider.component";
import {signOutUser} from "../../utils/firebase/firebase-users.utils";

const Navigation = () => {

    const {authData} = useContext(AuthContext)

    return (
        <>
            <nav className="navigation">

                <div>
                    <div className="navigation-links-container">
                        <Link className="navigation-links" to="/">
                            @TOUCHEDBYNOA
                        </Link>
                    </div>
                </div>

                <div>

                    <div className="navigation-links-container">
                        <Link className="navigation-links" to="/services">
                            <FontAwesomeIcon icon={faScissors}/>
                            SERVICES
                        </Link>
                    </div>

                    {
                        authData ?
                            <>
                                <div className="navigation-links-container">
                                    <Link className="navigation-links" to="/profile">
                                        <FontAwesomeIcon icon={faUser}/>
                                        PROFILE
                                    </Link>
                                </div>
                                <div className="navigation-links-container">
                                <span className="navigation-links"
                                      onClick={signOutUser}>
                                    <FontAwesomeIcon icon={faCircleUser}/>
                                    SIGN OUT
                                </span>
                                </div>
                            </> :
                            <div className="navigation-links-container">
                                <Link className="navigation-links" to="/auth">
                                    <FontAwesomeIcon icon={faCircleUser}/>
                                    SIGN IN
                                </Link>
                            </div>

                    }


                </div>
            </nav>
            <div style={{
                paddingTop: '10vh'
            }}>
                <Outlet/>
            </div>

        </>
    );
};

export default Navigation;
