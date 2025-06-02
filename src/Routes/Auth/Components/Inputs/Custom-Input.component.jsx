import './Inputs.styles.scss'


const CustomInput = ({identifier, onChange, value, ...remainingFields}) => {

    return (
        <div className={'inputDivider'}>
            {
                remainingFields.title &&
                <label htmlFor={identifier} className={'input-label'}>{remainingFields.title}</label>
            }

            {
                remainingFields.inputType === 'textarea' ? (
                        <textarea

                            name={identifier}
                            id={identifier}
                            value={value}
                            onChange={onChange}
                            className='formField'
                            rows={5}
                            required

                            {...remainingFields}/>
                    ) :
                    (
                        <input

                            name={identifier}
                            id={identifier}
                            value={value}
                            onChange={onChange}
                            className='formField'
                            required

                            {...remainingFields}/>
                    )

            }

        </div>
    )
}

export default CustomInput;