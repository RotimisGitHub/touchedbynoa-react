import './AuthButtons.styles.scss'

const AuthButtons = ({validForm, children}) => {


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