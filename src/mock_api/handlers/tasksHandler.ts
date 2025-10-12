import { http, HttpResponse } from "msw";
import { tasks } from "../sample_data/tasks.data";
import { type EditTask, type NewTask, type Task } from "../../types/task.types";

export const tasksHandlers = [
  http.get("/api/tasks", ({ request }) => {
    const userId = request.headers.get("userId");
    const allTasks = tasks.filter((task) => task.userId === userId);
    return HttpResponse.json({ success: true, tasks: allTasks });
  }),
  //create a new task
  http.post("/api/tasks", async ({ request }) => {
    const data = (await request.json()) as NewTask;
    const newTask: Task = {
      ...data,
      id: Date.now.toString(),
      status: "pending",
    };
    tasks.push(newTask);
    return HttpResponse.json(newTask);
  }),
  //edit an existing task
  http.put("/api/tasks/:taskId", async ({ request, params }) => {
    const { taskId } = params;
    const userId = request.headers.get("userId");
    if (!userId) {
      return HttpResponse.json(
        { success: false, message: "User ID Missing" },
        { status: 403 }
      );
    }
    const { title, description, status } = (await request.json()) as EditTask;
    const taskIndex = tasks.findIndex(
      (task) => task.userId === userId && task.id === taskId
    );

    if (taskIndex < 0) {
      return HttpResponse.json(
        {
          success: false,
          message:
            "Either the task ID is invalid or you do not have permission to changed it.",
        },
        { status: 403 }
      );
    }
    tasks[taskIndex].title = title;
    tasks[taskIndex].description = description;
    tasks[taskIndex].status = status;
  }),
  http.delete("/api/tasks/:taskId", ({ request, params }) => {
    const { taskId } = params;
    const userId = request.headers.get("userId");
    if (!userId) {
      return HttpResponse.json(
        { success: false, message: "UserId missing" },
        { status: 403 }
      );
    }
    const taskIndex = tasks.findIndex(
      (task) => task.userId === userId && task.id === taskId
    );
    if (taskIndex < 0)
      return HttpResponse.json(
        {
          success: false,
          message:
            "Either the task ID is invalid or you do not have permission to delete it.",
        },
        { status: 403 }
      );

    tasks.splice(taskIndex, 1);
  }),
];
