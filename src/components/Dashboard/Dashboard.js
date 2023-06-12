import { StatusColon } from "./StatusColon";

import styles from "./Dashboard.module.css";

const columnsData = [
  {
    title: "to do",
    tasks: [],
  },
  {
    title: "in progress",
    tasks: [],
  },
  {
    title: "in review",
    tasks: [],
  },
  {
    title: "done",
    tasks: [],
  },
];

export const Dashboard = ({ tasks }) => {
  // Create new array and add tasks related with each column
  const columns = columnsData.map((column) => ({
    ...column,
    tasks: tasks.filter((task) => task.status === column.title),
  }));

  return (
    <div className={styles["colons-wrapper"]}>
      {columns.map((column) => (
        <StatusColon
          key={column.title}
          tasks={column.tasks}
          title={column.title}
          className={styles["section-colon"]}
        />
      ))}
    </div>
  );
};
