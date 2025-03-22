import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faScissors, faCalendarAlt, faUser, faCircleUser} from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    return (
        <Fragment>
            <nav className="navigation">
                {/*
                    2 DIVs IN BETWEEN ENABLE FLEXBOX TO SEPARATE THEM WITHIN THE NAVIGATION BAR.
                    USING JUSTIFY-CONTENT: SPACE-BETWEEN
                */}
                <div>
                    <div className="navigation-links-container">
                        <Link className="navigation-links" to="/">
                            @TOUCHEDBYNOA
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="navigation-links-container">
                        
                        <Link className="navigation-links" to="/book">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            BOOK NOW
                        </Link>
                    </div>

                    <div className="navigation-links-container">
                            <Link className="navigation-links" to="/services">
                                <FontAwesomeIcon icon={faScissors} />
                                SERVICES
                            </Link>
                    </div>

                    <div className="navigation-links-container">
                        <Link className="navigation-links" to="/profile">
                            <FontAwesomeIcon icon={faUser} />
                            PROFILE
                        </Link>
                    </div>

                    {/*<div className="navigation-links-container">*/}
                    {/*    <Link className="navigation-links" to="/contact">*/}
                    {/*        CONTACT US*/}
                    {/*    </Link>*/}
                    {/*</div>*/}

                    <div className="navigation-links-container">
                        <Link className="navigation-links" to="/auth">
                            <FontAwesomeIcon icon={faCircleUser} />
                            SIGN IN / SIGN OUT
                        </Link>
                    </div>
                </div>
            </nav>

            <Outlet />
        </Fragment>
    );
};

export default Navigation;
