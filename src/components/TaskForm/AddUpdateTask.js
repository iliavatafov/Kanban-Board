import { useEffect, useState } from "react";
import { CirclePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";

import { loadingActions } from "../../store/loadingSlice";
import { modalActions } from "../../store/modalSlice";
import { errorActions } from "../../store/errorSlice";
import { tasksActions } from "../../store/tasksSlice";

import { addTask, getTask, updateTask } from "../../apis/tasks";

import { isStringLengthValid } from "../../utils/validations";

import { Button } from "../Button/Button";
import { Spinner } from "../Spinner/Spinner";

import styles from "./AddUpdateTask.module.css";

const validationMessagesInitialState = {
  title: false,
  description: false,
  deadline: false,
};

const inputValuesInitialState = {
  title: "",
  status: "to do",
  storyPoints: "1",
  description: "",
  deadline: "",
  color: "#f44336",
};

export const AddUpdateTask = () => {
  const [inputValues, setInputValues] = useState(inputValuesInitialState);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [validaionMessages, setValidationMessages] = useState(
    validationMessagesInitialState
  );

  const update = useSelector((state) => state.modal.update);
  const loading = useSelector((state) => state.loading.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const taskData = await getTask(update.id);
        setInputValues({
          title: taskData.title,
          status: taskData.status,
          storyPoints: taskData.storyPoints,
          description: taskData.description,
          deadline: taskData.deadline,
          color: taskData.color,
        });
        setIsContentLoaded(true);
      } catch (error) {
        dispatch(modalActions.openModal("error"));
        dispatch(errorActions.setError(error.message));
      }
    };

    // Check if update layout and if it is fetch the data for a cirtain task and populate it in the form
    if (update.isUpdate) {
      fetchTaskData();
    }
  }, [dispatch, update.id, update.isUpdate]);

  const onChange = (e) => {
    setInputValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeColor = (color) => {
    setInputValues((values) => ({
      ...values,
      color: color.hex,
    }));
  };

  const handleCloseColorPicker = () => {
    setShowColorPicker(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setValidationMessages(validationMessagesInitialState);

    const isTitleValid = isStringLengthValid(inputValues.title, 5);
    const isDescriptionValid = isStringLengthValid(inputValues.description, 10);
    const isDeadlineValid = inputValues.deadline;

    const isFormValid = isDeadlineValid && isDescriptionValid && isTitleValid;

    // If the form is not valid peform validation checks and set validation messeges where mandatory and return
    if (!isFormValid) {
      if (!isTitleValid) {
        setValidationMessages((currentState) => ({
          ...currentState,
          title: true,
        }));
      }

      if (!isDescriptionValid) {
        setValidationMessages((currentState) => ({
          ...currentState,
          description: true,
        }));
      }

      if (!isDeadlineValid) {
        setValidationMessages((currentState) => ({
          ...currentState,
          deadline: true,
        }));
      }

      return;
    }

    try {
      dispatch(loadingActions.showLoading());
      let data = [];
      // Make API request depends on layout, if update layout perform PATCH else perform POST
      if (update.isUpdate) {
        data = await updateTask(update.id, inputValues);
        dispatch(tasksActions.updateTask(data));
      } else {
        data = await addTask(inputValues);
        dispatch(tasksActions.addTask(data));
      }
      dispatch(modalActions.closeModal());
    } catch (error) {
      dispatch(modalActions.openModal("error"));
      dispatch(errorActions.setError(error.message));
    } finally {
      dispatch(loadingActions.hideLoading());
    }
  };

  // Delete function not DELETE the task but change the status of it of DONE with PATCH API request
  const handleDelete = async () => {
    try {
      dispatch(loadingActions.showLoading());
      const data = await updateTask(update.id, {
        ...inputValues,
        status: "done",
      });
      dispatch(tasksActions.updateTask(data));
      dispatch(modalActions.closeModal());
    } catch (error) {
      dispatch(modalActions.openModal("error"));
      dispatch(errorActions.setError(error.message));
    } finally {
      dispatch(loadingActions.hideLoading());
    }
  };

  // Check when to show the form
  const showForm =
    (!update.isUpdate && !loading) || (isContentLoaded && update.isUpdate);

  // Render update layout if update.isUpdate is true or add issue layout if not
  return (
    <>
      {loading && <Spinner />}
      {showForm && (
        <form
          data-testid="add-update-form"
          onSubmit={handleSubmit}
          className={styles["add-wrapper"]}
          onClick={showColorPicker ? handleCloseColorPicker : null}
        >
          <h1 className={styles.title}>
            {update.isUpdate ? "Update issue" : "Create issue"}
          </h1>
          <div>
            <label htmlFor="title">
              Title <span>*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={inputValues.title}
              onChange={onChange}
            />
            {validaionMessages.title && (
              <span>The title should be at least 5 characters long</span>
            )}
          </div>
          <div className={styles.colors}>
            <div
              onClick={() =>
                setShowColorPicker((currentState) => !currentState)
              }
              className={`${styles.circle}`}
              style={{ backgroundColor: inputValues.color }}
            ></div>
            {showColorPicker && (
              <div
                className={styles["color-wrapper"]}
                onClick={() =>
                  setShowColorPicker((currentState) => !currentState)
                }
              >
                <CirclePicker
                  onChange={handleChangeColor}
                  color={inputValues.color.background}
                />
              </div>
            )}
          </div>
          <div>
            <label htmlFor="status">
              Status <span>*</span>
            </label>
            <select
              name="status"
              id="status"
              value={inputValues.status}
              onChange={onChange}
            >
              <option value="to do">TO DO</option>
              <option value="in progress">IN PROGRESS</option>
              <option value="in review">IN REVIEW</option>
              <option value="done">DONE</option>
            </select>
          </div>
          <div>
            <label htmlFor="storyPoints">
              Story points <span>*</span>
            </label>
            <select
              name="storyPoints"
              id="storyPoints"
              value={inputValues.storyPoints}
              onChange={onChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="8">8</option>
              <option value="13">13</option>
              <option value="20">20</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">
              Description <span>*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="10"
              cols="80"
              value={inputValues.description}
              onChange={onChange}
            />
            {validaionMessages.description && (
              <span>The description should be at least 10 characters long</span>
            )}
          </div>
          <div>
            <label htmlFor="deadline">
              Deadline <span>*</span>
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              value={inputValues.deadline}
              onChange={onChange}
            />
            {validaionMessages.deadline && (
              <span>The deadline is mandatory field</span>
            )}
          </div>
          <div className={styles.actions}>
            <div className={styles.right}>
              <Button
                title={
                  update.isUpdate
                    ? loading
                      ? "Update..."
                      : "Update"
                    : loading
                    ? "Create..."
                    : "Create"
                }
                color="green"
                disableButton={loading}
                type="submit"
              />
              <Button
                title="Cancel"
                color="gray"
                type="button"
                action={() => dispatch(modalActions.closeModal())}
              />
            </div>
            <div className={styles.left}>
              {update.isUpdate && (
                <Button
                  title="Delete"
                  color="red"
                  type="button"
                  action={handleDelete}
                  disableButton={loading}
                />
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
};
