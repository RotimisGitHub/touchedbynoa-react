import './Buttons.styles.scss'


const ProgressiveButton = ({type, onClickHandler, children, ...otherProps}) => {
    return (

        <button
            type={type}
            className={'button-cta-small'}
            onClick={onClickHandler}
            {...otherProps}
        >
            {children}
        </button>
    )
}

export default ProgressiveButton;