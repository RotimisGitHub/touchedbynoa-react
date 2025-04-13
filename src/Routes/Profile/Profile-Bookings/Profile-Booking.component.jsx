import './Profile-Bookings.styles.scss'
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../Context/UserProvider.component";
import {getBookingsForUserProfile} from "../../../utils/firebase/firebase-collections.utils";
import Button from "../../../General-Components/Buttons/CTA-Button.component";
import '../../../General-Components/Cards/Card.styles.scss'
import {CatalogContext} from "../../../Context/CatalogProvider.component";

const ProfileBooking = () => {
    const {authData} = useContext(AuthContext)
    const [userBookings, setUserBookings] = useState(null)

    useEffect(() => {
        const fetchBookings = async () => {
            const bookings = await getBookingsForUserProfile(authData?.uid);
            setUserBookings(bookings);
        };

        fetchBookings();
    }, []);
    console.log(userBookings)


    return (
        <div className={'profile-booking-container'}>
            <div className={'booking-container'}>
                {
                    !userBookings ? (
                        <p>Loading...</p>
                    ) : (
                        userBookings.map(({ hairstyle, details }, index) => (
                            <div className={'image-card-container'}>
                                <img key={index} src={hairstyle.image} alt={hairstyle.title} className={'card-image'}/>
                                <div className={'image-card-information'}>
                                    <h2>{hairstyle.title}</h2>
                                    <ul>
                                        <li>Date: {details.date}</li>
                                        <li>Thickness: {details.thickness}</li>
                                        <li>Length: {details.length}</li>
                                        <li>Location: TouchedByNoa HQ</li>
                                        <li>Outstanding Balance: £0</li>

                                    </ul>
                                    {/*<Button link={`/services/${id}`} key={id} size={'small'}>*/}
                                    {/*    LEARN MORE*/}
                                    {/*</Button>*/}

                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default ProfileBooking;