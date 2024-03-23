import React from 'react';
import './modal.scss';

const Modal = ({ children, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;
