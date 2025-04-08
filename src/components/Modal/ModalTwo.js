import React from "react";
import "./modalTwo.scss";

const ModalTwo = ({ isOpen, component }) => {
  return isOpen ? (
    <div className="main-modal">
      <div className="back-container"></div>
      <div className="modal-parent-container">
        <div className="modal-inner-container-two">{component}</div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ModalTwo;
