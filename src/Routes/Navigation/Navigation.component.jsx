import {Fragment, useEffect, useState} from "react";
import {Outlet, Link} from "react-router-dom";
import "./Navigation.styles.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faScissors, faUser, faCircleUser, faUserTie} from "@fortawesome/free-solid-svg-icons";
import {signOutUser} from "../../utils/firebase/firebase-users.utils";
import {useSelector} from "react-redux";

const Navigation = () => {

    const { currentUser, role } = useSelector((state) => state.user);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 768);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (currentUser && role === null) {
        return <h2>Loading user role...</h2>
    }



    return (
        <>
            <nav className="navigation">

                {
                    isDesktop && (
                        <div className={'navigation-groups'}>
                            <div className="navigation-links-container">
                                <Link className="navigation-links" to="/">
                                    <br/>
                                    @TOUCHEDBYNOA
                                </Link>
                            </div>
                        </div>
                    )
                }


                <div className={'navigation-groups'}>

                    {
                        !isDesktop && (
                            <div className="navigation-links-container">
                                <Link className="navigation-links" to="/">
                                    @TOUCHEDBYNOA
                                </Link>
                            </div>
                        )
                    }

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
            <div className={'outlet-container'}>
                <Outlet/>
            </div>

        </>
    );
};

export default Navigation;
