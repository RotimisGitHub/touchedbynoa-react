import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobeEurope} from "@fortawesome/free-solid-svg-icons";
import './Time-Zone.styles.scss'

const TimeZone = () => {
    const currentTime = new Date().toLocaleTimeString('en-GB', { timeZone: 'Europe/London' }).slice(0, -3)

    return (
        <div className={'time-zone-container'}>

                    <span>
                        Time Zone:
                    </span>
            <div className={'time-zone'}>
                        <span>
                        <FontAwesomeIcon icon={faGlobeEurope}/>
                    </span>
                <span>UK, Ireland, Lisbon Time {currentTime}</span>
            </div>


        </div>
    )
}

export default TimeZone;