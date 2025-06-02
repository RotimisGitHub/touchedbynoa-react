import './Product.styles.scss'
import {useParams} from "react-router-dom";
import ProgressiveButton from "../../General-Components/Buttons/ProgressiveButton.component";
import {useState} from "react";
import BookingPage from "../Booking-Confirmation/Booking-Page.components";
import Modal from "../../General-Components/Modal/Modal.component";

import {useDispatch, useSelector} from "react-redux";
import {setHairstyle} from "../../store/calendar/calendar.reducer";
import {selectHairstyleReducer} from "../../store/hairstyles/hairstyles.selector";


const Product = () => {

    const {collection} = useSelector(selectHairstyleReducer)
    const dispatch = useDispatch()
    const [activeModal, setModalState] = useState(false)



    const {productId} = useParams();
    if (!collection) return <h2>Loading product data...</h2>;
    const allHairstyles = Object.values(collection).flatMap(category => category);
    const product = allHairstyles
        .find(style => style.id === Number(productId));

    const handleModalState = (modalAction) => {
        setModalState(modalAction === 'open')
        dispatch(setHairstyle({modalAction, product}))
    }




    if (!product) return <h2>Product Not Found</h2>;


    return (
        <div className={'product-container'}>
            <div className={'products-visuals-container'}>
                <img src={product.imageFile} alt={product.hairstyleTitle}
                     className={'product-image'}/>


            </div>
            <div className={'products-booking-container'}>
                <div className={'product-information'}>
                    <h3>{product.hairstyleTitle}</h3>
                    <p>£{product.price}</p>
                    <p>
                        {product.description}
                    </p>

                    <div className={'product-cta-section'}>

                        <ProgressiveButton type={'submit'} onClickHandler={() => handleModalState('open')}>
                            Book Appointment
                        </ProgressiveButton>
                    </div>
                </div>


                <div className={'product-booking-section'}>


                    <div className={'availability-section'}>

                        <Modal onClose={() => handleModalState('close')} show={activeModal}>
                            <BookingPage handleModal={handleModalState}/>
                        </Modal>


                    </div>


                    {/*<div className={'production-reviews-section'}>*/}
                    {/*    <p>*/}
                    {/*        INSERT REVIEWS HERE*/}
                    {/*    </p>*/}

                    {/*</div>*/}
                </div>


            </div>

        </div>
    )
}

export default Product;