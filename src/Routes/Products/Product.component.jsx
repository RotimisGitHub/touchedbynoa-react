import './Product.styles.scss'
import {useParams} from "react-router-dom";
import ProgressiveButton from "../../General-Components/Buttons/ProgressiveButton.component";
import {useContext} from "react";
import CalenderComponent from "./Calender/Calender.component";
import {CatalogContext} from "../../Context/CatalogProvider.component";


const Product = () => {

    const {hairstyles} = useContext(CatalogContext)
    console.log(hairstyles)


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

                        <ProgressiveButton type={'submit'}>
                            Add To Favourites
                        </ProgressiveButton>
                    </div>
                </div>


                <div className={'product-booking-section'}>
                    <form className={'product-form'}>

                        <div className={'availability-section'}>


                            <CalenderComponent productName={product.hairstyleTitle}/>


                        </div>

                    </form>

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