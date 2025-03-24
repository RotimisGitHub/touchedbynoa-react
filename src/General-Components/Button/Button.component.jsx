import './Button.styles.scss'

import {Link} from "react-router-dom";

const Button = ({link, type, onClickHandler, children}) => {

    return (
        <button className={'button-cta'}
                type={type}
                onClick={onClickHandler ? onClickHandler : undefined}
        >
            <Link to={link}>
                {children}
            </Link>
        </button>
    )

}

export default Button;