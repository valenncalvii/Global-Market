import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "../css/Modal.css";

export default function Modal({ isOpen, onClose, paymentMethods, onSelectPaymentMethod }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Cerrar modal">X</button>
        <h2>Medios de Pago</h2>
        <ul>
          {paymentMethods.map((method, index) => (
            <li key={index} onClick={() => onSelectPaymentMethod(method)}>
              {method}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
