import './parameter-form.styles.scss'
import CustomInput from "../../../../Auth/Components/Inputs/Custom-Input.component";
import AuthButtons from "../../../../Auth/Components/Auth-Buttons/AuthButtons.component";

const ParameterForm = ({type, inputRef, formRef, handleInputs}) => {


    return (

            <form ref={formRef}
                  className={'profile-account-form'}
                  onSubmit={null}>

                <CustomInput
                    identifier={type}
                    type={type}
                    ref={inputRef}
                    onChange={handleInputs}/>
                <AuthButtons>Submit</AuthButtons>
            </form>


    )
}

export default ParameterForm