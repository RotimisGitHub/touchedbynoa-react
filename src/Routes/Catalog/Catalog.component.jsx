import './Catalog.styles.scss'
import Card from "../../General-Components/Cards/Card.component";

import {useSelector} from "react-redux";
import {selectHairstyleReducer} from "../../store/hairstyles/hairstyles.selector";



const Catalog = () => {
    const {collection} = useSelector(selectHairstyleReducer)
    return (
        <div className={'catalog-container'}>
            <div className={'products-filter-container'}>
                <p>Filter Component Goes here...</p>

            </div>
            <div className={'products-container'}>

                {
                    collection['braids']?.map((hairstyle, index) => {
                        return (
                            <Card key={index} hairstyle={hairstyle}/>
                        )
                    })
                }

                {
                    collection['twists']?.map((hairstyle, index) => {
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