import './Calender.styles.scss'
import { InlineWidget } from "react-calendly";


const CalenderComponent = ({productName}) => {
    const productSlug = productName.toLowerCase().replace(/\s+/g, "-");

    const userData = {
        name: 'John Smith',
        email: 'john@gmail.com',


    }

    const calendlyUrl = `https://calendly.com/djatto2003/${productSlug}?name=${encodeURIComponent(userData.name)}&email=${encodeURIComponent(userData.email)}`

    console.log(calendlyUrl)

    return (

            <>
                <InlineWidget url={calendlyUrl}/>
            </>

    )
    };

export default CalenderComponent;