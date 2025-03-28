import './Product.styles.scss'
import braids1 from "../../assets/home-catalog-preview/braid-style-1.png";
import braids2 from "../../assets/home-catalog-preview/braid-style-2.png";
import braids3 from "../../assets/home-catalog-preview/braid-style-3.png";
import braids4 from "../../assets/home-catalog-preview/braid-style-4.png";
import braids5 from "../../assets/home-catalog-preview/braid-style-5.png";
import braids6 from "../../assets/home-catalog-preview/braid-style-6.png";
import braids7 from "../../assets/home-catalog-preview/braid-style-7.png";
import braids8 from "../../assets/home-catalog-preview/braid-style-8.png";
import {useParams} from "react-router-dom";
import ProgressiveButton from "../../General-Components/Buttons/ProgressiveButton.component";
import {useState} from "react";
import CalenderComponent from "./Calender/Calender.component";


const sizes = [
    'X Small',
    'Small',
    'Medium',
    'Large',
    'X Large'
]
const hairstyles = [
    {
        id: 1,
        hairstyleTitle: "Elegant Box Braids",
        imageFile: braids1,
        description: "Classic and stylish box braids, perfect for a timeless look.",
        price: 119.95,
    },
    {
        id: 2,
        hairstyleTitle: "Bohemian Goddess Braids",
        imageFile: braids2,
        description: "Loose and natural-looking braids with curly ends for a goddess-like appearance.",
        price: 119.95,
    },
    {
        id: 3,
        hairstyleTitle: "Knotless Braids",
        imageFile: braids3,
        description: "Lightweight and tension-free braids for a more comfortable and natural look.",
        price: 119.95,
    },
    {
        id: 4,
        hairstyleTitle: "Tribal Fulani Braids",
        imageFile: braids4,
        description: "Beautifully intricate tribal braids featuring beads and unique patterns.",
        price: 119.95,
    },
    {
        id: 5,
        hairstyleTitle: "Cornrow Lemonade Braids",
        imageFile: braids5,
        description: "Side-swept cornrow braids inspired by the iconic Lemonade album.",
        price: 119.95,
    },
    {
        id: 6,
        hairstyleTitle: "Passion Twists",
        imageFile: braids6,
        description: "Soft, Boho-inspired twists that give a naturally voluminous look.",
        price: 119.95,
    },
    {
        id: 7,
        hairstyleTitle: "Jumbo Box Braids",
        imageFile: braids7,
        description: "Bold and beautiful jumbo-sized braids for a statement-making style.",
        price: 119.95,
    },
    {
        id: 8,
        hairstyleTitle: "Micro Braids",
        imageFile: braids8,
        description: "Intricate micro-sized braids that create a seamless and natural flow.",
        price: 119.95,
    }
];

const Product = () => {
    const [selectedRadio, setSelectedRadio] = useState({
        'length': null,
        'thickness': null
    })


    const {productId} = useParams();
    const product = hairstyles.find(item => item.id === Number(productId));

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