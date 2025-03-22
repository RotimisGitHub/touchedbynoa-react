import './Button.styles.scss'

import {Link} from "react-router-dom";

const Button = ({link, children}) => {

    return (
        <button className={'button-cta'}>
            <Link to={link}>
                {children}
            </Link>
        </button>
    )

}

export default Button;