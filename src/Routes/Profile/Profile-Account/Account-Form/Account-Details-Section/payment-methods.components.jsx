import './account-form.styles.scss'
import {useContext, useRef, useState} from "react";
import {AuthContext} from "../../../../../Context/UserProvider.component";
import {faApplePay, faCcStripe, faGooglePay, faPaypal} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWallet} from "@fortawesome/free-solid-svg-icons";


const PaymentMethods = () => {
    const ParameterSpan = ({parameter}) => {

        const getDisplayText = () => {
            if (parameter === "password") {
                return "*".repeat(8);
            } else if (authData[parameter] === null) {
                return "Click Edit to Add";
            } else {
                return authData[parameter];
            }
        };

        return <span className={'parameter-span'}>{getDisplayText()}</span>
    }

    const handleParameterEdits = (parameter) => {
        setChangeParameter((prevState) => {
            return {
                ...prevState,
                [parameter]: !prevState[parameter]
            }

        })
    }

    const paymentData = {
        stripe: '',
        paypal: '',
        applePay: '',
        googlePay: '',
    }
    const {authData} = useContext(AuthContext)

    const [userInputData, setInputData] = useState(paymentData)
    const [changeParameter, setChangeParameter] = useState({
        stripe: false,
        paypal: false,
        applePay: false,
        googlePay: false,
    })

    return (
        <div className={'account-form-container'}>

            <h3 style={{
                textAlign: 'center'
            }}>Payment Methods</h3>

            {/*<div className={'account-header-image'}>*/}


            {/*<FontAwesomeIcon icon={faWallet} className={'payment-header-icon'}/>*/}
            {/*</div>*/}


            <div className={'parameter-form'}>
                <FontAwesomeIcon icon={faCcStripe} className={'payment-method-icons'}/>
                <ParameterSpan parameter={'stripe'}/>

                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('stripe')}>{!changeParameter.stripe ? 'Edit' : 'Cancel'}
                </span>
            </div>


            <div className={'parameter-form'}>
                <FontAwesomeIcon icon={faApplePay} className={'payment-method-icons'}/>
                <ParameterSpan parameter={'applePay'}/>
                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('applePay')}>{!changeParameter.applePay ? 'Edit' : 'Cancel'}
                </span>
            </div>
            <div className={'parameter-form'}>
                <FontAwesomeIcon icon={faPaypal} className={'payment-method-icons'}/>
                <ParameterSpan parameter={'paypal'}/>

                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('paypal')}> {!changeParameter.paypal ? 'Edit' : 'Cancel'}
                </span>
            </div>
            <div className={'parameter-form'}>
                <FontAwesomeIcon icon={faGooglePay} className={'payment-method-icons'}/>
                <ParameterSpan parameter={'googlePay'}/>
                <span className={'parameter-edit-button'}
                      onClick={() => handleParameterEdits('googlePay')}> {!changeParameter.googlePay ? 'Edit' : 'Cancel'}
                </span>
            </div>


        </div>


    )
}

export default PaymentMethods;

