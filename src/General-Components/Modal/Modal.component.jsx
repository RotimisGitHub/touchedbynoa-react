import './Modal.styles.scss'

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-container" onClick={onClose}
        >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;