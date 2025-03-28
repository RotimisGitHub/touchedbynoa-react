import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple, faGoogle} from "@fortawesome/free-brands-svg-icons";
import CustomInput from "../Inputs/Custom-Input.component";
import {useRef, useState} from "react";
import AuthButtons from "../Auth-Buttons/AuthButtons.component";
import {logInWithEnP} from "../../../../utils/firebase/firebase-users.utils";
import './Auth-Form.styles.scss'

const SignInForm = ({logGoogle}) => {
    const loginData = {
        email: '',
        password: ''
    }
    // States
    const [userInputData, setInputData] = useState(loginData)
    const {email, password} = userInputData

    const [invalidPassword, setInvalidPassword] = useState(false)
    const [invalidEmail, setInvalidEmail] = useState(false)

    // Refs
    const formRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleInputs = (event) => {
        const {name, value} = event.target;
        setInputData((prevState) => {
            return {
                ...prevState,
                [name]: value
            }

        })

    }
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await logInWithEnP(email, password)
            if (response) {
                formRef.current.submit()
                // Clear FORM FIELDS
                setInputData(loginData)

                console.log('complete')
            }

        } catch (error) {
            switch (error.code) {
                case ('auth/wrong-password'): {
                    // Clear Password Field
                    setInputData((prevState => {
                            return {
                                ...prevState,
                                password: ''
                            }

                        })
                    )
                    // Show Error message for incorrect password
                    setInvalidPassword(true)
                    if (invalidEmail) setInvalidPassword(false);
                }
                    break;

                case ('auth/user-not-found'): {
                    setInvalidEmail(true)
                    if (invalidPassword) setInvalidPassword(false);
                    break;


                }
                default :
                    setInvalidEmail(false)
                    setInvalidPassword(false)
                    console.log(error)

            }


        }


    }

    return (
        <form ref={formRef}
              className={'auth-form'}
              onSubmit={handleSubmit}>
                <h1>SIGN IN</h1>

            <div className={'firebase-app-buttons'}>
                <FontAwesomeIcon icon={faGoogle} onClick={logGoogle}/>
                <FontAwesomeIcon icon={faApple}/>
            </div>

                <p>or use your account</p>



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
                <p>Forgot Your Password?</p>


                <AuthButtons validForm={() => emailRef.current.checkValidity() && passwordRef.current.checkValidity()}>SIGN
                    IN</AuthButtons>

        </form>
    )
}

export default SignInForm;