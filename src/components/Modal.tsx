
import React, { ReactNode, useRef } from 'react';
import './Modal.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Cierra el modal si se hizo clic fuera del contenido del modal
    }
  };

  return (
    <div className="modal" onClick={handleClickOutside}>
      <div className="modal-content" ref={modalRef}>
        {/* <span className="close" onClick={onClose}>&times;</span> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
