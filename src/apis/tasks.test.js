import { getTasks, getTask, addTask, updateTask } from "./tasks";

describe("API Functions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("getTasks should fetch and return tasks", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        taskId1: { title: "Task 1" },
        taskId2: { title: "Task 2" },
      }),
    };

    global.fetch.mockResolvedValue(mockResponse);

    const tasks = await getTasks();

    expect(global.fetch).toHaveBeenCalledWith(
      "https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks.json"
    );
    expect(tasks).toEqual([
      { id: "taskId1", title: "Task 1" },
      { id: "taskId2", title: "Task 2" },
    ]);
  });

  test("getTask should fetch and return a specific task", async () => {
    const taskId = "taskId1";
    const taskData = { title: "Task 1" };

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(taskData),
    };

    global.fetch.mockResolvedValue(mockResponse);

    const task = await getTask(taskId);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`
    );
    expect(task).toEqual({ id: taskId, ...taskData });
  });

  it("should update a task", async () => {
    const taskId = "existingTaskId";
    const updatedTask = {
      title: "Updated Task",
      status: "in progress",
      color: "#ffffff",
      deadline: "2023-06-15",
      description: "Updated description",
      storyPoints: 3,
    };

    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(updatedTask),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const result = await updateTask(taskId, updatedTask);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    expect(mockResponse.json).toHaveBeenCalled();
    expect(result).toEqual({ id: taskId, ...updatedTask });
  });

  it("should throw an error when something goes wrong", async () => {
    const taskId = "existingTaskId";
    const updatedTask = {
      title: "Updated Task",
      status: "in progress",
      color: "#ffffff",
      deadline: "2023-06-15",
      description: "Updated description",
      storyPoints: 3,
    };

    const mockResponse = {
      ok: false,
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(updateTask(taskId, updatedTask)).rejects.toThrow(
      "Something went wrong!"
    );

    expect(global.fetch).toHaveBeenCalledWith(
      `https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should throw an error when something goes wrong", async () => {
    const task = {
      title: "New Task",
      status: "todo",
      color: "#ffffff",
      deadline: "2023-06-15",
      description: "New task description",
      storyPoints: 2,
    };

    const mockResponse = {
      ok: false,
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    await expect(addTask(task)).rejects.toThrow("Something went wrong!");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://simple-kanban-board-1be19-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });
});
