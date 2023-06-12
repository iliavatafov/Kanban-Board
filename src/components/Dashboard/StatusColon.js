import { TaskCard } from "../TaskCard/TaskCard";

import styles from "./Dashboard.module.css";

export const StatusColon = ({ title, tasks }) => {
  return (
    <div className={styles["section-colon"]}>
      <div className={styles["title-wrapper"]}>
        <h1 className={styles.title}>{title.toUpperCase()}</h1>
        <div className={styles.count}>{tasks.length}</div>
      </div>
      <section className={styles["tasks-wrapper"]}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </section>
    </div>
  );
};
