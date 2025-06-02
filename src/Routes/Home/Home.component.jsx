
import './Home.styles.scss'
import Hero from './Components/Hero/Hero.component'
import CatalogPreview from "./Components/Catalog-Preview/Catalog-Preview.component";



const Home = () => {

    return (
        <div className={'home-container'}>
        <Hero/>
            <CatalogPreview/>

        </div>
    )


}

export default Home;