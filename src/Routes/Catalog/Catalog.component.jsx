import './Catalog.styles.scss'
import Card from "../../General-Components/Cards/Card.component";
import {useContext} from "react";
import {CatalogContext} from "../../Context/CatalogProvider.component";


const Catalog = () => {
    const {hairstyles} = useContext(CatalogContext)
    return (
        <div className={'catalog-container'}>
            <div className={'products-filter-container'}>
                <p>Filter Component Goes here...</p>

            </div>
            <div className={'products-container'}>

                {
                    hairstyles['braids']?.map((hairstyle, index) => {
                        return (
                            <Card key={index} hairstyle={hairstyle}/>
                        )
                    })
                }

                {
                    hairstyles['twists']?.map((hairstyle, index) => {
                        return (
                            <Card key={index} hairstyle={hairstyle}/>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Catalog;