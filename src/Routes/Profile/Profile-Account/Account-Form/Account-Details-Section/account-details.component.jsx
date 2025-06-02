import './account-form.styles.scss'
import { useRef, useState} from "react";
import ParameterForm from "../Parameter-Forms/parameter-form.component";
import {useSelector} from "react-redux";
import {selectUserSlice} from "../../../../../store/user/user.selector";


const AccountForm = () => {

    const accountData = {
        email: '',
        password: '',
        phoneNumber: ''
    }
    const currentUser = useSelector(selectUserSlice)

    const [userInputData, setInputData] = useState(accountData)
    const [changeParameter, setChangeParameter] = useState({
        email: false,
        password: false,
        phoneNumber: false,
        photoUrl: false,
    })



    const ParameterSpan = ({parameter}) => {

        const getDisplayText = () => {
            if (parameter === "password") {
                return "*".repeat(8);
            } else if (currentUser[parameter] === null) {
                return "Click Edit to Add";
            } else {
                return currentUser[parameter];
            }
        };

        return <span className={'parameter-span'}>{getDisplayText()}</span>

    }

    const emailFormRef = useRef(null)
    const passwordFormRef = useRef(null)
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

    const handleParameterEdits = (parameter) => {
        setChangeParameter((prevState) => {
            return {
                ...prevState,
                [parameter]: !prevState[parameter]
            }

        })
    }

    return (
        <div className={'account-form-container'}>

            <h3 style={{
                textAlign: 'center'
            }}>Account Details</h3>

            <div className={'parameter-form'}>
                <label htmlFor={'photoUrl'} className={'profile-account-label'}>Profile Picture:</label>

                <div className={'account-header-image'}>


                    <img src={currentUser.photoURL} alt={currentUser.name}/>
                </div>
                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('photoUrl')}>{!changeParameter.photoUrl ? 'Edit' : 'Cancel'}
                </span>
            </div>


            <div className={'parameter-form'}>
                <label htmlFor={'email'} className={'profile-account-label'}>Email:</label>
                {
                    !changeParameter.email ? <ParameterSpan parameter={'email'}/> :
                        <ParameterForm type={'email'}
                                       inputRef={emailRef}
                                       formRef={emailFormRef}
                                       handleInputs={handleInputs}
                                       authData={currentUser}
                                       handleParameterEdits={handleParameterEdits}/>
                }
                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('email')}>{!changeParameter.email ? 'Edit' : 'Cancel'}
                </span>
            </div>
            <div className={'parameter-form'}>
                <label htmlFor={'password'} className={'profile-account-label'}>Password:</label>

                {
                    !changeParameter.password ? <ParameterSpan parameter={'password'}/> :
                        <ParameterForm type={'password'}
                                       inputRef={passwordRef}
                                       formRef={passwordFormRef}
                                       handleInputs={handleInputs}
                                       authData={currentUser}
                                       handleParameterEdits={handleParameterEdits}/>

                }
                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('password')}> {!changeParameter.password ? 'Edit' : 'Cancel'}
                </span>
            </div>
            <div className={'parameter-form'}>
                <label htmlFor={'tel'} className={'profile-account-label'}>Phone:</label>

                {
                    !changeParameter.phoneNumber ? <ParameterSpan parameter={'phoneNumber'}/> :
                        <ParameterForm type={'tel'}
                                       inputRef={passwordRef}
                                       formRef={passwordFormRef}
                                       handleInputs={handleInputs}
                                       authData={currentUser}
                                       handleParameterEdits={handleParameterEdits}/>

                }
                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('phoneNumber')}> {!changeParameter.phoneNumber ? 'Edit' : 'Cancel'}
                </span>
            </div>


        </div>


    )


}

export default AccountForm;