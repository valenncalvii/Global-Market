import React from "react";
import ReactDOM from "react-dom";
import "../css/Modal.css"; 

export default function Modal({ isOpen, onClose, paymentMethods }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Medios de Pago</h2>
        <ul>
          {paymentMethods.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}