import React from "react";
import Overlay from "../Overlay/Overlay";

const modal = (props) => {
  return (
    <>
      <Overlay
        show={props.show}
        closeModal={props.closeModal}
        width={props.width}
      />
      <div
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? 1 : 0,
          width: props.width ? "120em" : "55em",
        }}
        className="modal"
      >
        {props.children}
      </div>
    </>
  );
};

export default modal;
