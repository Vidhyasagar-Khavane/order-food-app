import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return <div className={classes["modal-overlay"]}>{props.children}</div>;
};

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onCloseCart} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
