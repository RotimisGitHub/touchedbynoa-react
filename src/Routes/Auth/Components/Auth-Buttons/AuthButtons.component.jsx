import './AuthButtons.styles.scss'

const AuthButtons = ({validForm, children}) => {
    {/* Disable button if the for is not valid */}

    return (
        <button
        type={"submit"}
        className={'auth-button'}
        disabled={!validForm}
        >
            {children}
        </button>
    )
}

export default AuthButtons;