import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import './Calender-Header.styles.scss'

const CalenderHeader = ({chosenMonth, handleCurrentMonth, chosenYear}) => {
    return (
        <div className={'calendar-header'}>
                <span className={'month-change-span'}>
                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleCurrentMonth('back')}/>
                </span>

            <span className={'month-name'}>{chosenMonth} {chosenYear}</span>

            <span className={'month-change-span'}>
                    <FontAwesomeIcon icon={faChevronRight} onClick={() => handleCurrentMonth('forward')}/>
                </span>

        </div>
    )
}

export default CalenderHeader;