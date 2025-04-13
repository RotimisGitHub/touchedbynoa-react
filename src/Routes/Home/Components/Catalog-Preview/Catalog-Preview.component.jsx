import Scroll from "../../../../General-Components/Scroll/Scroll.component";

import Card from "../../../../General-Components/Cards/Card.component";
import './Catalog-Preview.styles.scss';
import {useContext} from "react";
import {CatalogContext} from "../../../../Context/CatalogProvider.component";


const CatalogPreview = () => {
    const {hairstyles} = useContext(CatalogContext)
    return (
        <div className={'catalog-preview-container'}>
            <div className={'catalog-preview-text'}>
                <h1>HOTTEST STYLES FROM US!</h1>
            </div>
            <Scroll>
                {
                    hairstyles['braids']?.map(hairstyle => {
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
