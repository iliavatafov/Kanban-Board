export const getTasks = async () => {
  try {
    const response = await fetch(
      "https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
    );

    const data = await response.json();

    if (response.ok) {
      if (data !== null) {
        // Transform and return fetched data from firebase in array with objects and include id in each object
        return Object.keys(data).map((element) => ({
          id: element,
          ...data[element],
        }));
      }
    } else {
      throw new Error("Somthing went wrong!");
    }
  } catch (error) {
    throw new Error("Somthing went wrong!");
  }
};

export const getTask = async (taskId) => {
  try {
    const response = await fetch(
      `https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`
    );

    const data = await response.json();

    if (response.ok && data !== null) {
      // Transform and return fetched data from firebase in array with objects and include id in each object
      return {
        id: taskId,
        ...data,
      };
    } else {
      throw new Error("Task not found!");
    }
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export const addTask = async (task) => {
  try {
    // Add current date to the task object
    const currentDate = new Date().toISOString().slice(0, 10);
    task.currentDate = currentDate;

    const response = await fetch(
      "https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      const taskId = Object.values(data)[0];
      // Fetch the newly created task and return it
      const newTask = await getTask(taskId);
      return newTask;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await fetch(
      `https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Transform and return fetched data from firebase in array with objects and include id in each object
      const updatedData = {
        id: taskId,
        ...data,
      };
      return updatedData;
    } else {
      throw new Error("Something went wrong!");
    }
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};
