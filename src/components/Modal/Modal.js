import React from "react";
import crossIcon from "../../assets/image/crossIcon.png";
import "./modal.scss";

const Modal = ({ isOpen, isClose, component, handleClose }) => {
  return isOpen ? (
    <div className="main-modal">
      <div className="back-container">
       
       </div>
      <div className="modal-parent-container">
        {isClose ? (
          <div className="cros-row">
            <div
              className="cross-box"
              onClick={() => {
                handleClose(false);
              }}
            >
              <img className="cross-image" src={crossIcon} alt="" />
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="modal-inner-container">{component}</div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
