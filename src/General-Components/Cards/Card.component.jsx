import Button from "../Button/Button.component";
import './Card.styles.scss'

const Card = ({hairstyle}) => {

    const {id, hairstyleTitle, imageFile, description} = hairstyle
    return (
        <div className={'image-card-container'}>
            <img key={id} src={imageFile} alt={hairstyleTitle} className={'card-image'}/>
            <div className={'image-card-information'}>
                <h2>{hairstyleTitle}</h2>
                <p>{description}</p>
                {/* to be changed to book/hairstyle_link */}
                <Button link={'/book'}>
                    LEARN MORE
                </Button>

            </div>
        </div>
    )
}

export default Card;