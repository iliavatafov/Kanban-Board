import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";

import { modalActions } from "../../store/modalSlice";

import { Backdrop } from "../Modal/Backdrop";
import { ModalOverlay } from "../Modal/ModalOverlay";
import { Button } from "../Button/Button";

import styles from "./ErrorMessage.module.css";

export const ErrorMessage = ({ message }) => {
  const dispatch = useDispatch();

  const errorMessageHTML = (
    <div className={styles["errorMessage-container"]}>
      <h1>Error</h1>
      <p>{message}</p>
      <Button
        title="OK"
        color="blue"
        action={() => dispatch(modalActions.closeModal())}
      />
    </div>
  );

  return (
    <>
      {createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
      {createPortal(
        <ModalOverlay>{errorMessageHTML}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
