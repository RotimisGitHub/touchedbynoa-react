import './content-management.styles.scss'
import {useState} from "react";
import Modal from "../../../General-Components/Modal/Modal.component";
import ContentEdit from "./content-edit/content-edit.component";
import EditCard from "../../../General-Components/Cards/EditCard.component";
import {useSelector} from "react-redux";
import {selectHairstyleReducer} from "../../../store/hairstyles/hairstyles.selector";


const ContentManagement = () => {
    const {collection} = useSelector(selectHairstyleReducer);
    const [openModal, setModalState] = useState(false)

    const handleModalState = (hairstyle) => {
        if (typeof hairstyle === 'object' && typeof hairstyle !== 'string') {
            setModalState(hairstyle)
            document.body.style.overflowY = 'hidden'
        } else if (hairstyle === 'close') {
            setModalState(false)
            document.body.style.overflowY = 'scroll'


        }
    }

    return (
        <div className={'management-container'}>
            <div className={'products-container'}>

                {
                    collection['braids']?.map((hairstyle, index) =>
                        <EditCard key={index} index={index} hairstyle={hairstyle} onClickHandler={() => handleModalState(hairstyle)}/>
                    )
                }

                {
                    collection['twists']?.map((hairstyle, index) =>
                        <EditCard key={index} index={index} hairstyle={hairstyle} onClickHandler={() => handleModalState(hairstyle)}/>
                    )
                }

            </div>

            <Modal onClose={() => handleModalState('close')} show={openModal}>
                <ContentEdit chosenHairstyle={openModal} handleModalState={handleModalState}/>

            </Modal>

        </div>
    )
}

export default ContentManagement;