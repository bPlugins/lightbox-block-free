


import { createPortal } from "react-dom";
import { useEffect } from "react";
import "./CustomModal.scss";
import { closeIcon } from '../../../../../bpl-tools/utils/icons';

const CustomModal = ({ isOpen, onClose, children, id }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className={`llb-custom-modal-overlay`} id={`lbb_audio_modal-${id}`} onClick={onClose}>

            <div className="llb-custom-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="llb-custom-modal-close" onClick={onClose}>{closeIcon}</button>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default CustomModal;
