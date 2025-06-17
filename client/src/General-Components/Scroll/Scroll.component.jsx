import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import './Scroll.styles.scss'
import {useState, useRef} from "react";


const Scroll = (props) => {
    const scrollContainerRef = useRef(null)

    const handleScroll = (direction) => {
        scrollContainerRef.current.style.overflowX = 'auto';
        const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;


        if (direction === 'left'){
            scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    }


    return (
        <div className={'scroll-container'}>

            <button className={'scroll-direction-button'}
            onClick={() => handleScroll('left')}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>

            <div className={'horizontal-scroller'}>
                <div className={'scroll-prop-container'}
                    ref={scrollContainerRef}>
                    {props.children}
                </div>
            </div>


            <button className={'scroll-direction-button'}
                    onClick={() => handleScroll('right')}>
                <FontAwesomeIcon icon={faChevronRight}/>
            </button>

        </div>
    )
}

export default Scroll