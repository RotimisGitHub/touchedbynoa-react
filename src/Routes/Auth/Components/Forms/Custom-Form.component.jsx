import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGoogle} from "@fortawesome/free-brands-svg-icons";
import CustomInput from "../Inputs/Custom-Input.component";
import Button from "../../../../General-Components/Buttons/CTA-Button.component";
import {useRef} from "react";

import './Custom-Form.styles.scss'

const CustomForm = ({formType}) => {
    const formRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const nameRef = useRef(null)

    const handleInputs = () => {
        return (null)
    }

    return (
        <form ref={formRef}
              className={'auth-form'}>
            {formType === "sign-in" ?
                <h1>SIGN IN</h1> :
                <h1>SIGN UP</h1>}

            <div className={'firebase-app-buttons'}>
                <FontAwesomeIcon icon={faGoogle}/>
                <FontAwesomeIcon icon={faApple}/>
            </div>
            {formType === "sign-in" ?
                <p>or use your account</p> :
                <p>or use your email for registration</p>}

            {formType === 'sign-up' ?
                <CustomInput
                    identifier={'name'}
                    type={'text'}
                    ref={nameRef}
                    onChange={handleInputs}
                    placeholder='Name'/>:
                ""
            }


            <CustomInput
                identifier={'email'}
                type={'text'}
                ref={emailRef}
                onChange={handleInputs}
                placeholder='Email'/>


            <CustomInput


                identifier='password'
                type={'password'}
                onChange={handleInputs}
                ref={passwordRef}
                placeholder={'Password'}
            />
            {formType === "sign-in" ?
                <p>Forgot Your Password?</p> :
                ''}

            {formType === "sign-in" ?
                <Button type={'submit'}>SIGN IN</Button> :
                <Button type={'submit'}>SIGN UP</Button>}

        </form>
    )
}

export default CustomForm;