import CustomInput from "../Inputs/Custom-Input.component";
import {useEffect, useRef, useState} from "react";
import AuthButtons from "../Auth-Buttons/AuthButtons.component";
import {obtainInformationFromDB, createAuthUserWithEnP} from "../../../../utils/firebase/firebase-users.utils";

import './Auth-Form.styles.scss'

const SignUpForm = () => {
    const loginData = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    // States
    const [userInputData, setInputData] = useState(loginData)
    // Destructing the userInputData object to enable updating its state using handleInputs
    const {displayName, email, password, confirmPassword} = userInputData;

    const [validForm, setValidForm] = useState(false)
    const [validEmail, setValidEmail] = useState(null)

    // Refs


    const confirmPasswordRef = useRef(null)
    const formRef = useRef(null)
    const emailRef = useRef(null)



    const validEmailComponent = (
        <>
            <p style={{
                color: "red",
            }}>This email is already in use. Sign Up a different email, or <i>Sign In</i> using this email.</p>
            <br/>
        </>
    )



    const handleInputs = (event) => {
        const {name, value} = event.target;
        setInputData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }

        })

    }
    useEffect(() => {
        console.log(userInputData)
        if (!(userInputData.password === userInputData.confirmPassword)) {
            confirmPasswordRef.current.setCustomValidity('Please Ensure Your Passwords Match!')
            setValidForm(false)


        } else {
            confirmPasswordRef.current.setCustomValidity('')

        }
        const checkEmail = async () => {
            const emailInDB = await obtainInformationFromDB('email', userInputData) // Logs what the Promise resolves
            setValidEmail(!emailInDB)
        }

        checkEmail()

        setValidForm(formRef.current.checkValidity() && validEmail)

    }, [validEmail, userInputData]);


    const handleSubmit = async (event) => {
        event.preventDefault()


        const response = await createAuthUserWithEnP(email, password, displayName)

        if (response) {
            formRef.current.submit()
            setInputData(loginData)
            console.log('complete')
        }


    }

    return (
        <form ref={formRef}
              className={'auth-form'}
              onSubmit={handleSubmit}>
                <h1>SIGN UP</h1>
            {!validEmail && validEmailComponent}

                <CustomInput
                    identifier={'name'}
                    type={'text'}
                    onChange={handleInputs}
                    placeholder='Name'
                    minLength='5'
                    maxLength='25'/>



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
                placeholder={'Password'}
                minLength='8' maxLength='20'
                pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$'
            />
            <CustomInput


                identifier='confirmPassword'
                type={'password'}
                ref={confirmPasswordRef}
                onChange={handleInputs}
                placeholder={'Confirm Password'}
                valid={() => confirmPassword === password}
            />


                <AuthButtons validForm={validForm}>SIGN UP</AuthButtons>

        </form>
    )
}

export default SignUpForm;