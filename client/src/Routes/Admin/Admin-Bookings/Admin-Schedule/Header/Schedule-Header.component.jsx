import './Schedule-Header-styles.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";

const ScheduleHeader = ({disableScrolling, disableBackScrolling, handleCurrentWeek,
                            chosenWeek}) => {

    const {hairstyles} = useSelector((state) => state.analytics)
    const styles = hairstyles.map(key => key.items.hairstyleTitle)

    return (
        <div className={'schedule-header-container'}>
            <div className={'schedule-filter-container'}>
                <select className={'filter-selection'} name={'hairstyle-selection'}>
                    {
                        styles.map((style, index) => {
                            return (
                                <option key={index} value={style}>
                                    {style}
                                </option>
                            )

                        })
                    }
                </select>

            </div>
            <div className={'schedule-date-controller'}>
                <span className={'week-change-span'}>
                {
                    !disableBackScrolling &&
                    <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleCurrentWeek('back')}/>
                }
                </span>

                <span className={'week-range'}>{chosenWeek.name}</span>


                <span className={'week-change-span'}>
                {
                    !disableScrolling &&
                    <FontAwesomeIcon icon={faChevronRight} onClick={() => handleCurrentWeek('forward')}/>
                }


                </span>

            </div>
        </div>
    )
}

export default ScheduleHeader;