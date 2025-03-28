// import {useRef} from "react";
import CustomForm from "./Components/Forms/Sign-In-Form.component";
import FormBlurb from "./Components/Form-Blurb/Form-Blurb.component";
import './auth.styles.scss'
import {useState} from "react";
import SignInForm from "./Components/Forms/Sign-In-Form.component";
import SignUpForm from "./Components/Forms/Sign-Up-Form.component";
import {createUserDocument, signInWithGooglePopup} from "../../utils/firebase/firebase-users.utils";



const AuthComponent = () => {
    const [activeForm, setActiveForm] = useState('sign-in')

    const activeFormClassName = `partitioned-container active-form`
    const inactiveFormClassName = `partitioned-container`

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup()
        const userDocument = await createUserDocument(user)
        console.log(userDocument)
    }

    return (
        <div className={'auth-container'}>
            <div className={activeForm === "sign-in"?
                activeFormClassName : inactiveFormClassName}>

                {activeForm === "sign-in"?
                    <SignInForm logGoogle={logGoogleUser}/>:
                <FormBlurb formType={'sign-in'} setActiveForm={setActiveForm}/> }


            </div>
            <div className={activeForm === "sign-up"?
                activeFormClassName : inactiveFormClassName}>

                {activeForm === "sign-up"? <SignUpForm/>:
                    <FormBlurb formType={'sign-up'} setActiveForm={setActiveForm}/> }

            </div>
        </div>
    )
}

export default AuthComponent;