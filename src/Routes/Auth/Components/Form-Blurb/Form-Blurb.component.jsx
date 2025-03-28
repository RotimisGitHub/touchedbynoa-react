import './Form-Blurb.styles.scss'
import ProgressiveButton from "../../../../General-Components/Buttons/ProgressiveButton.component";


const FormBlurb = ({formType, setActiveForm}) => {
    return (
        <div className={'form-blurb-container'}>
            <h1>Hello, Beautiful</h1>
            {formType === 'sign-in'?
            <p>To book appointments and more, Please Sign In!</p> :
            <p>Don't have an account with up? Please Sign Up Now!</p>}

            {formType === "sign-in" ?
                <ProgressiveButton type={'submit'} onClickHandler={() => setActiveForm('sign-in')}>SIGN IN</ProgressiveButton> :
                <ProgressiveButton type={'submit'} onClickHandler={() => setActiveForm('sign-up')}>SIGN UP</ProgressiveButton>}

        </div>

    )
}

export default FormBlurb;