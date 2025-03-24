import './Inputs.styles.scss'


const CustomInput = ({identifier, onChange, value, ...remainingFields}) => {

    return (
        <div className={'inputDivider'}>
            <input

                name={identifier}
                value={value}
                onChange={onChange}
                className='formField'
                required

                {...remainingFields}/>
        </div>
    )
}

export default CustomInput;