import './Penultimate-Confirmation.styles.scss'
import TimeZone from "../../../General-Components/Calendar/Time-Zone/Time-Zone.component";
import ProgressiveButton from "../../../General-Components/Buttons/ProgressiveButton.component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarWeek, faLocation, faStopwatch, faUserClock} from "@fortawesome/free-solid-svg-icons";
import SizeSelection from "./Size-Selection/Size-Selection.component";
import {addToBookingsCollection} from '../../../utils/firebase/firebase-collections.utils'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectCalendarReducer} from "../../../store/calendar/calendar.selector";
import {CardElement} from "@stripe/react-stripe-js";

import { PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';



const PenultimateConfirmation = ({selectedSizes, handleSelectedSizes, completeBookingData, setActiveModal}) => {
    const {date, time, hairstyleDuration, hairstylePrice} = useSelector(selectCalendarReducer)
    const navigate = useNavigate()
    const stripe = useStripe();
    const [paymentRequest, setPaymentRequest] = useState(null);

    useEffect(() => {
        if (stripe) {
            console.log('stripe', stripe)
            const pr = stripe.paymentRequest({
                country: 'GB',
                currency: 'gbp',
                total: {
                    label: 'Booking Total',
                    amount: hairstylePrice * 100,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            // Check if user can actually use Apple Pay / Google Pay
            pr.canMakePayment().then(result => {
                if (result) {
                    setPaymentRequest(pr); // render the button
                }
            });
        }
    }, [stripe, hairstylePrice]);

    const handleCompleteScheduling = async () => {

        const completeBooking = await addToBookingsCollection(completeBookingData)
        if (completeBooking) {
            setActiveModal('close')
            navigate('/profile/bookings')
        }
    }
    return (
        <div className={'pc-container'}>
            <div className={'pc-header'}>
                <TimeZone/>

                    <div className={'pc-selected-times'}>
                        <span><FontAwesomeIcon icon={faCalendarWeek}/> {date.toLocaleString()}</span>
                        <span><FontAwesomeIcon icon={faUserClock}/> {time}</span>
                        <span><FontAwesomeIcon icon={faStopwatch}/> {hairstyleDuration} Hours</span>
                        <span><FontAwesomeIcon icon={faLocation}/> Location Will Be Emailed When Booking Confirmed</span>
                    </div>

            </div>
            <div className={'pc-body'}>
                <SizeSelection selectedSizes={selectedSizes} handleSelectedSizes={handleSelectedSizes}/>

                <span>
                    By proceeding, you confirm that you have read and agree to
                    TouchByNoa's Terms of Use and Privacy Notice.
                </span>

                {paymentRequest && (
                    <PaymentRequestButtonElement options={{ paymentRequest }} />
                )}
                <ProgressiveButton type={'button'} disabled={!(selectedSizes?.length && selectedSizes?.thickness)}
                onClickHandler={handleCompleteScheduling}>
                    Schedule Appointment
                </ProgressiveButton>

            </div>
        </div>
    )
}

export default PenultimateConfirmation;