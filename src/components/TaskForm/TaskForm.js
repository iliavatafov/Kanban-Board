import { createPortal } from "react-dom";

import { ModalOverlay } from "../Modal/ModalOverlay";
import { Backdrop } from "../Modal/Backdrop";
import { AddUpdateTask } from "./AddUpdateTask";

export const TaskForm = () => {
  return (
    <>
      {createPortal(<Backdrop />, document.getElementById("backdrop-root"))}
      {createPortal(
        <ModalOverlay>{<AddUpdateTask />}</ModalOverlay>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
