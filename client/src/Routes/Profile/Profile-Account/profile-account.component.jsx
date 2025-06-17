import './profile-account.styles.scss'
import AccountForm from "./Account-Form/Account-Details-Section/account-details.component";
import PaymentMethods from "./Account-Form/Account-Details-Section/payment-methods.components";

const ProfileAccount = () => {
    return (
        <div className={'profile-account-container'}>
            <div className={'profile-left-section'}>
                <AccountForm/>
            </div>
            <div className={'profile-right-section'}>
                <PaymentMethods/>
            </div>
        </div>

    )
}

export default ProfileAccount;