import './Size-Selection.styles.scss'
import {hairstylesSizes} from "../../Booking-Confirmation.utils";
import CustomRadio from "../../../../General-Components/Custom-Radios/Custom-Radio.component";


const SizeSelection = ({selectedSizes, handleSelectedSizes}) => {
    return (
        <div className={'pc-page-size-selection'}>
            <div className={'product-size-selection'}>

                <span className={'size_selection-header'}>
                    Choose Length of Style
                </span>

                {
                    hairstylesSizes.map((size, index) => {
                        return (
                            <CustomRadio type={'length'} index={index} value={size}
                                         selectedRadio={selectedSizes}
                                         eventHandler={handleSelectedSizes}/>
                        )
                    })
                }
            </div>

            <div className={'product-size-selection'}>

                <span className={'size_selection-header'}>
                    Choose Thickness of Style
                </span>

                {
                    hairstylesSizes.map((size, index) => {
                        return (
                            <CustomRadio type={'thickness'} index={index} value={size}
                                         selectedRadio={selectedSizes}
                                         eventHandler={handleSelectedSizes}/>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default SizeSelection;