import Scroll from "../../../../General-Components/Scroll/Scroll.component";
import braids1 from '../../../../assets/home-catalog-preview/braid-style-1.png';
import braids2 from '../../../../assets/home-catalog-preview/braid-style-2.png';
import braids3 from '../../../../assets/home-catalog-preview/braid-style-3.png';
import braids4 from '../../../../assets/home-catalog-preview/braid-style-4.png';
import braids5 from '../../../../assets/home-catalog-preview/braid-style-5.png';
import braids6 from '../../../../assets/home-catalog-preview/braid-style-6.png';
import braids7 from '../../../../assets/home-catalog-preview/braid-style-7.png';
import braids8 from '../../../../assets/home-catalog-preview/braid-style-8.png';
import Card from "../../../../General-Components/Cards/Card.component";
import './Catalog-Preview.styles.scss';

const hairstyles = [
    {
        id: 1,
        hairstyleTitle: "Elegant Box Braids",
        imageFile: braids1,
        description: "Classic and stylish box braids, perfect for a timeless look."
    },
    {
        id: 2,
        hairstyleTitle: "Bohemian Goddess Braids",
        imageFile: braids2,
        description: "Loose and natural-looking braids with curly ends for a goddess-like appearance."
    },
    {
        id: 3,
        hairstyleTitle: "Knotless Braids",
        imageFile: braids3,
        description: "Lightweight and tension-free braids for a more comfortable and natural look."
    },
    {
        id: 4,
        hairstyleTitle: "Tribal Fulani Braids",
        imageFile: braids4,
        description: "Beautifully intricate tribal braids featuring beads and unique patterns."
    },
    {
        id: 5,
        hairstyleTitle: "Cornrow Lemonade Braids",
        imageFile: braids5,
        description: "Side-swept cornrow braids inspired by the iconic Lemonade album."
    },
    {
        id: 6,
        hairstyleTitle: "Passion Twists",
        imageFile: braids6,
        description: "Soft, Boho-inspired twists that give a naturally voluminous look."
    },
    {
        id: 7,
        hairstyleTitle: "Jumbo Box Braids",
        imageFile: braids7,
        description: "Bold and beautiful jumbo-sized braids for a statement-making style."
    },
    {
        id: 8,
        hairstyleTitle: "Micro Braids",
        imageFile: braids8,
        description: "Intricate micro-sized braids that create a seamless and natural flow."
    }
];

const CatalogPreview = () => {
    return (
        <div className={'catalog-preview-container'}>
            <div className={'catalog-preview-text'}>
                <h1>HOTTEST STYLES FROM US!</h1>
            </div>
            <Scroll>
                {
                    hairstyles.map(hairstyle => {
                        return (
                            <Card key={hairstyle.id} hairstyle={hairstyle}/>
                        )
                    })
                }

            </Scroll>

        </div>
    )
}

export default CatalogPreview;
