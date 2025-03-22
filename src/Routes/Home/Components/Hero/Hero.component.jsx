import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Button from "../../../../General-Components/Button/Button.component";
import './Hero.styles.scss'

const Hero = ({images}) => {
    const [imageIteration, setImageIteration] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            if (imageIteration !== images.length - 1) {
                setImageIteration(imageIteration + 1);
            } else {
                setImageIteration(0);
            }
            // Change image after 5 seconds
        }, 5000);

        return () => clearInterval(timer);
    }, [imageIteration]);
    return (
        <div className={'hero-container'}>

            <img key={imageIteration} src={images[imageIteration]} alt={'hero-image'}
                 className={'hero-image'}/>

            <div className={'hero-container-overlay'}>
                <div className={'hero-text'}>
                    <h1>HELLO FROM TOUCHEDBYNOA</h1>
                    <p>
                        Flawless Braids, Rare Beauty.
                        <br/>
                        We craft precision, style, and elegance—because your hair deserves the best.
                    </p>
                </div>

                <div className={'hero-cta'}>
                    <Button link={'/book'}>
                        BOOK NOW
                    </Button>
                </div>


            </div>

        </div>
    )
}

export default Hero;