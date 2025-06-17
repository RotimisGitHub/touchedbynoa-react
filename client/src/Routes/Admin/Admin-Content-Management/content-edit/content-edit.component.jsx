import './content-edit.styles.scss'
import ProgressiveButton from "../../../../General-Components/Buttons/ProgressiveButton.component";
import {useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../../../Auth/Components/Inputs/Custom-Input.component";

import {editHairstyle} from '../../../../utils/firebase/firebase-admin-analytics.utils'

const ContentEdit = ({chosenHairstyle, handleModalState}) => {

    const {hairstyleTitle, imageFile, description, price, id} = chosenHairstyle
    const initialInputData = {
        hairstyleTitle,
        description,
        price,
        imageFile
    }
    const [inputData, setInputData] = useState(initialInputData)
    const [previewImage, setPreviewImage] = useState(imageFile);
    const [dimensions, setDimensions] = useState(null);

    const handleImageLoad = () => {
        if (imageRef.current) {
            if (imageRef.current.width > 200){
                setDimensions({
                    width: `200px`,
                    height: `auto`
                });

            } else {
                setDimensions({
                    width: `${imageRef.current.width}px`,
                    height: `${imageRef.current.height}px`
                });
            }

        }
    };

    const handleImbbImageUpload = async (file) => {
        const apiKey = 'a688f31a29c1018e1d643233e60a6cf8';

        const formData = new FormData();

        const base64Image = await convertToBase64(file);
        formData.append('image', base64Image);

        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            console.log('Upload successful:', data);
            setInputData({
                ...inputData,
                imageFile: data.data.url
            })
        } catch (err){
            console.error('Upload failed:', err);
        }

    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleInputs = (event) => {
        const name = event.target.name;
        let value;

        if (name === 'imageFile') {
            const file = event.target.files[0];


            if (file) {
                const previewURL = URL.createObjectURL(file);
                console.log(previewURL)

                setPreviewImage(previewURL);


                value = file;
            }
        } else {
            value = event.target.value;
        }

        setInputData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirmChanges = async () => {
        let updatedData = { ...inputData };

        if (inputData.imageFile instanceof File) {
            const uploadedImageURL = await handleImbbImageUpload(inputData.imageFile);
            if (uploadedImageURL) {
                updatedData.imageFile = uploadedImageURL;
            } else {
                console.error("Image upload failed, cannot proceed.");
                return;
            }
        }

        const response = await editHairstyle(id, updatedData);
        if (response) {
            handleModalState('close');
            console.log(response);
        }
    }


    const [engageImageOverlay, setEngageOverlay] = useState(false)
    const imageRef = useRef(null)
    const imageUploadRef = useRef(null)



    return (


        typeof chosenHairstyle === 'object' && (
            <div className={'edit-content-container'}>
                <div className={'edit-image'} style={dimensions ? dimensions : {}}
                     onMouseOver={() => setEngageOverlay(true)}
                     onMouseLeave={() => setEngageOverlay(false)}>
                    {
                        engageImageOverlay &&
                        <div className={'image-overlay'}>

                            <FontAwesomeIcon icon={faPenToSquare}/>
                        </div>
                    }
                    <img ref={imageRef} src={previewImage} alt={hairstyleTitle} key={id} onLoad={handleImageLoad}
                    />

                    <input ref={imageUploadRef} type="file" accept="image/*" name={'imageFile'}
                           onChange={handleInputs}
                           className={'invisible-image-input'}/>


                </div>

                <div className={'edit-content-information'}>
                    <CustomInput identifier={'hairstyleTitle'}
                                 type={'text'}
                                 onChange={handleInputs}
                                 value={inputData.hairstyleTitle}
                                 title={'Title'}/>
                    <CustomInput identifier={'price'}
                                 type={'number'}
                                 onChange={handleInputs}
                                 value={inputData.price}
                                 title={'Price (£)'}/>
                    <CustomInput identifier={'duration'}
                                 type={'number'}
                                 onChange={handleInputs}
                                 value={inputData.duration}
                                 title={'Duration (Hours / Minutes)'}/>
                    <CustomInput identifier={'description'}
                                 type={'text'}
                                 onChange={handleInputs}
                                 value={inputData.description}
                                 title={'Description'}
                                 inputType={'textarea'}/>


                </div>
                <div className={'edit-content-complete'}>
                    <ProgressiveButton type={'button'} onClickHandler={handleConfirmChanges}>
                        Confirm Changes
                    </ProgressiveButton>
                </div>
            </div>
        )


    )
}

export default ContentEdit;