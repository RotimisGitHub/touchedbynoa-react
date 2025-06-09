import './Size-Selection.styles.scss'
import {hairstylesSizes} from "../../../../General-Components/Calendar/Booking-Confirmation.utils";
import CustomRadio from "../../../../General-Components/Custom-Radios/Custom-Radio.component";

import {useDispatch, useSelector} from "react-redux";
import {setSelectedSizes} from "../../../../store/calendar/calendar.reducer";
import {selectCalendarReducer} from "../../../../store/calendar/calendar.selector";


const SizeSelection = () => {
    const dispatch = useDispatch()
    const {selectedSizes} = useSelector(selectCalendarReducer)

    const handleSelectedSizes = (type, value) =>
        dispatch(setSelectedSizes({type, value}))

    return (
        <div className={'pc-page-size-selection'}>
            <div className={'product-size-selection'}>

                <span className={'size_selection-header'}>
                    Choose Length of Style
                </span>

                <div className={'product-selection-buttons'}>
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


            </div>

            <div className={'product-size-selection'}>

                <span className={'size_selection-header'}>
                    Choose Thickness of Style
                </span>

                <div className={'product-selection-buttons'}>
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

        </div>
    )
}

export default SizeSelection;