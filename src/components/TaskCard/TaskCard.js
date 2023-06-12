import { useDispatch } from "react-redux";
import { modalActions } from "../../store/modalSlice";

import styles from "./TaskCard.module.css";

export const TaskCard = ({ task }) => {
  const { title, color, deadline, storyPoints, id } = task;

  const dispatch = useDispatch();

  // Open TaskForm with update layout and pass id to fetch the data from the server and populate the form
  const handleUpdate = () => {
    dispatch(modalActions.setUpdate(id));
  };

  return (
    <article className={styles["task-wrapper"]} onClick={handleUpdate}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles["details-wrapper"]}>
        <div className={styles["details-left"]}>
          <div
            className={styles.color}
            style={{ backgroundColor: color }}
          ></div>
          <div className={styles.id}>{deadline}</div>
        </div>
        <div className={styles["details-right"]}>
          <div>{storyPoints}</div>
          <img
            src="https://media.licdn.com/dms/image/D4D03AQHqYaBPpGNnDw/profile-displayphoto-shrink_800_800/0/1683015128106?e=2147483647&v=beta&t=VxAMhKBCr6LLkhAQWI-nGmP6_rTNGjG1ZR0LgNkX45U"
            alt="assignee"
          />
        </div>
      </div>
    </article>
  );
};
