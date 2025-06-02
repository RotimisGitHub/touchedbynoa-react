import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './admin-cells.styles.scss'

const AdminCells = ({cellType}) => {
    const {name, quantity, icon} = cellType

    return (
        <div className={'admin-cell-container'}>
            <div className={'cell-icon-container'}>
                <FontAwesomeIcon icon={icon} className={'cell-icon'}/>
            </div>
            <div className={'cell-information'}>
                <h3>{name}</h3>
                <p>{quantity}</p>
            </div>
        </div>
    )
}

export default AdminCells;