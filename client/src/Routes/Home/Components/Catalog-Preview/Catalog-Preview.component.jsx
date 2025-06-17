import Scroll from "../../../../General-Components/Scroll/Scroll.component";
import Card from "../../../../General-Components/Cards/Card.component";
import './Catalog-Preview.styles.scss';
import {useSelector} from "react-redux";
import {selectHairstyleReducer} from "../../../../store/hairstyles/hairstyles.selector";


const CatalogPreview = () => {
    const {collection} = useSelector(selectHairstyleReducer)
    console.log(collection)


    if (!collection) {
        return <h1>Loading...</h1>
    }

    return (
        <div className={'catalog-preview-container'}>
            <div className={'catalog-preview-text'}>
                <h1>HOTTEST STYLES FROM US!</h1>
            </div>
            <Scroll>
                {collection && collection['braids']?.map(hairstyle => (
                    <Card key={hairstyle.id} hairstyle={hairstyle} />
                ))}

            </Scroll>

        </div>
    )
}

export default CatalogPreview;
