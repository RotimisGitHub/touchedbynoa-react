import './Profile-Bookings.styles.scss'
import {useEffect, useState} from "react";

import {getBookingsForUserProfile} from "../../../utils/firebase/firebase-collections.utils";
import '../../../General-Components/Cards/Card.styles.scss'
import {useSelector} from "react-redux";
import {selectUserSlice} from "../../../store/user/user.selector";

const ProfileBooking = () => {
    const currentUser = useSelector(selectUserSlice)
    const [userBookings, setUserBookings] = useState(null)

    useEffect(() => {
        const fetchBookings = async () => {
            const bookings = await getBookingsForUserProfile(currentUser?.uid);
            setUserBookings(bookings);
        };

        fetchBookings();
    }, [currentUser]);
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