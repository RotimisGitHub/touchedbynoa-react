import {Fragment} from "react";
import {Outlet, Link} from "react-router-dom";
import "./navigation.styles.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScissors, faUser, faCircleUser, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {signOutUser} from "../../utils/firebase/firebase-users.utils";
import {useSelector} from "react-redux";

const Navigation = () => {

    const { currentUser, role } = useSelector((state) => state.user);

    if (!currentUser || role === null) {
        return <h2>Loading user role...</h2>
    }

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
                        currentUser ?
                            <>
                                <div className="navigation-links-container">
                                    <Link className="navigation-links" to="/profile">
                                        <FontAwesomeIcon icon={faUser}/>
                                        PROFILE
                                    </Link>
                                </div>
                                { role === 'admin' && (
                                    <div className="navigation-links-container">
                                        <Link className="navigation-links" to="/admin">
                                            <FontAwesomeIcon icon={faUserTie}/>
                                            ADMIN
                                        </Link>
                                    </div>
                                )

                                }

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
                paddingTop: '10vh',
                height: 'fit-content'
            }}>
                <Outlet/>
            </div>

        </>
    );
};

export default Navigation;
