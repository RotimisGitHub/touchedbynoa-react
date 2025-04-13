import './Product.styles.scss'
import {useParams} from "react-router-dom";
import ProgressiveButton from "../../General-Components/Buttons/ProgressiveButton.component";
import {useContext, useEffect, useState} from "react";
import {CatalogContext} from "../../Context/CatalogProvider.component";
import BookingPage from "../Booking-Confirmation/Booking-Page.components";
import Modal from "../../General-Components/Modal/Modal.component";
import {CalendarContext} from "../../Context/CalendarProvider.component";


const Product = () => {

    const {hairstyles} = useContext(CatalogContext)
    const {fullDateVariable, setFullDateVariable} = useContext(CalendarContext)
    const [activeModal, setModalState] = useState(false)

    const handleModalState = (action) => {
        switch (action) {
            case 'open':
                setModalState(true)
                setFullDateVariable({
                    ...fullDateVariable,
                    hairstyleTitle: product.hairstyleTitle,
                    hairstyleImage: product.imageFile
                });
                break;
            case 'close':

                setFullDateVariable({
                    ...fullDateVariable,
                    hairstyleTitle: null,
                    hairstyleImage: null,
                    pageState: 0
                });
                setModalState(false);
                break;
            default:
                throw Error('Unknown action: ' + action);

        }
    }



    const {productId} = useParams();
    const allHairstyles = Object.values(hairstyles).flatMap(category => category);
    const product = allHairstyles
        .find(style => style.id === Number(productId));


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