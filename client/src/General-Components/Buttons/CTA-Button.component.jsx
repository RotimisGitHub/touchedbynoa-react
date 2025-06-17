import './Buttons.styles.scss'

import {Link} from "react-router-dom";

const CTAButton = ({link, size, children, ...otherProps }) => {

    return (

            <Link
                className={size !== 'small'? 'button-cta' : 'button-cta-small'}
                to={link} {...otherProps}>
                {children}
            </Link>
    )

}

export default CTAButton;