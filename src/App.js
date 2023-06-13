import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPlus } from "@fortawesome/free-solid-svg-icons";

import { modalActions } from "./store/modalSlice";
import { errorActions } from "./store/errorSlice";
import { tasksActions } from "./store/tasksSlice";
import { loadingActions } from "./store/loadingSlice";

import { getTasks } from "./apis/tasks";

import { handleDownload } from "./utils/downloadInExcel";

import { Button } from "./components/Button/Button";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { TaskForm } from "./components/TaskForm/TaskForm";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import { Spinner } from "./components/Spinner/Spinner";

import "./App.css";

function App() {
  const modal = useSelector((state) => state.modal);
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const tasks = useSelector((state) => state.tasks);
  const loading = useSelector((state) => state.loading.loading);

  const dispatch = useDispatch();

  // Initialy fetch all tasks from database and add it to the Redux store
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTasks();
        dispatch(tasksActions.setTasks(data));
      } catch (error) {
        dispatch(modalActions.openModal("error"));
        dispatch(errorActions.setError(error.message));
      } finally {
        dispatch(loadingActions.hideLoading());
      }
    }

    if (!tasks.length) {
      dispatch(loadingActions.showLoading());
      fetchData();
    }
  }, [tasks.length, loading, dispatch]);

  return (
    <div className="App" data-testid="app-component">
      {loading && <Spinner />}
      {!loading && tasks.length > 0 && (
        <>
          <div className="add-btn-wrapper">
            {modal.add && <TaskForm />}
            {modal.update.isUpdate && <TaskForm />}
            {modal.error && <ErrorMessage message={errorMessage} />}
            <Button
              title="New Issue"
              color="green"
              icon={<FontAwesomeIcon icon={faPlus} />}
              type="button"
              action={() => dispatch(modalActions.openModal("add"))}
            />
            <Button
              title={"Download Excel"}
              color="green"
              icon={<FontAwesomeIcon icon={faDownload} />}
              type="button"
              action={() => handleDownload(tasks)}
            ></Button>
          </div>
          <Dashboard tasks={tasks} />
        </>
      )}
    </div>
  );
}

export default App;
