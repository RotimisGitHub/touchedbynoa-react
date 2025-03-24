// import {useRef} from "react";
import CustomForm from "./Components/Forms/Custom-Form.component";
import FormBlurb from "./Components/Form-Blurb/Form-Blurb.component";
import './auth.styles.scss'
import {useState} from "react";



const AuthComponent = () => {
    const [activeForm, setActiveForm] = useState('sign-in')

    const activeFormClassName = `partitioned-container active-form`
    const inactiveFormClassName = `partitioned-container`

    return (
        <div className={'auth-container'}>
            <div className={activeForm === "sign-in"?
                activeFormClassName : inactiveFormClassName}>

                {activeForm === "sign-in"?
                    <CustomForm formType={'sign-in'}/>:
                <FormBlurb formType={'sign-in'} setActiveForm={setActiveForm}/> }


            </div>
            <div className={activeForm === "sign-up"?
                activeFormClassName : inactiveFormClassName}>

                {activeForm === "sign-up"? <CustomForm formType={'sign-up'}/>:
                    <FormBlurb formType={'sign-up'} setActiveForm={setActiveForm}/> }

            </div>
        </div>
    )
}

export default AuthComponent;