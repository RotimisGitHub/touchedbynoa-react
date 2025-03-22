import braids1 from '../../assets/home-hero/braids-2.png';
import braids2 from '../../assets/home-hero/braids-4.png';
import './Home.styles.scss'
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import Hero from './Components/Hero/Hero.component'
import CatalogPreview from "./Components/Catalog-Preview/Catalog-Preview.component";

const IMAGES = [
    braids1, braids2
]

const Home = () => {
    return (
        <div className={'home-container'}>
        <Hero images={IMAGES}/>
            <CatalogPreview/>

        </div>
    )


}

export default Home;