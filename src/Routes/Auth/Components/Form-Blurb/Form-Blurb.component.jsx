import './Form-Blurb.styles.scss'
import Button from "../../../../General-Components/Button/Button.component";


const FormBlurb = ({formType, setActiveForm}) => {
    return (
        <div className={'form-blurb-container'}>
            <h1>Hello, Beautiful</h1>
            {formType === 'sign-in'?
            <p>To book appointments and more, Please Sign In!</p> :
            <p>Don't have an account with up? Please Sign Up Now!</p>}

            {formType === "sign-in" ?
                <Button type={'submit'} onClickHandler={() => setActiveForm('sign-in')}>SIGN IN</Button> :
                <Button type={'submit'} onClickHandler={() => setActiveForm('sign-up')}>SIGN UP</Button>}

        </div>

    )
}

export default FormBlurb;