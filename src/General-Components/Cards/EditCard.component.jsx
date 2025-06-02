import './Card.styles.scss'
import ProgressiveButton from "../Buttons/ProgressiveButton.component";

const EditCard = ({index, hairstyle, onClickHandler}) => {

    const {hairstyleTitle, imageFile} = hairstyle

    return (
        <div className={'image-card-container'}>
            <img key={index} src={imageFile} alt={hairstyleTitle} className={'card-image'}/>
            <div className={'image-card-information'}>
                <h2>{hairstyleTitle}</h2>

                <ProgressiveButton type={'button'} onClickHandler={onClickHandler}>
                    EDIT
                </ProgressiveButton>

            </div>
        </div>
    )
}

export default EditCard;