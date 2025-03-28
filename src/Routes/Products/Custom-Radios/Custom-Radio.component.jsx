import './Custom-Radio.styles.scss'


const CustomRadio = ({type, index, value, eventHandler, selectedRadio}) => {
    return (
        <div className={selectedRadio[type] === value ? 'custom-radio selected' : 'custom-radio'}
             onClick={() => eventHandler(value, type)}>
            <input
                key={index}
                type="radio"
                className="product-size"
                name={type}
                value={value}
                id={`radio-${type}-${index}`}
                checked={selectedRadio[type] === value}

                onChange={() => eventHandler(value, type)}
            />
            <label htmlFor={`radio-${type}-${index}`} className="radio-label">{value}</label>
        </div>
    )
}

export default CustomRadio