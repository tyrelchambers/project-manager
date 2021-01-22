import React from "react";
import "./ModalContainer.css";
import { inject, observer } from "mobx-react";

const ModalContainer = ({ ModalStore }) => {
  if (ModalStore.isOpen) {
    const body = document
      .querySelector("body")
      .classList.add("overflow-hidden");
    console.log(body);
    return (
      <div className="modal-wrapper relative">
        <div
          className="close-modal"
          onClick={() => {
            ModalStore.setIsOpen(false);
          }}
        >
          <i className="fas fa-times"></i>
        </div>
        <div className="modal-content">{ModalStore.render}</div>
      </div>
    );
  } else {
    document.querySelector("body").classList.remove("overflow-hidden");

    return null;
  }
};

export default inject("ModalStore")(observer(ModalContainer));
