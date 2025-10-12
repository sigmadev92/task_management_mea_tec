import { http, HttpResponse } from "msw";
import { tasks } from "../sample_data/tasks.data";
import { type EditTask, type NewTask, type Task } from "../../types/task.types";
import { users } from "../sample_data/users.data";

export const tasksHandlers = [
  http.get("/api/tasks", ({ cookies }) => {
    const sessionId = cookies.sessionId;
    // find user
    const user = users.find((user) => user.sessionId === sessionId);
    if (!user) {
      return HttpResponse.json(
        { success: false, message: "Inalid UserId" },
        { status: 403 }
      );
    }
    const allTasks = tasks.filter((task) => task.userId === user.id);
    return HttpResponse.json({ success: true, tasks: allTasks });
  }),
  //create a new task
  http.post("/api/tasks", async ({ request, cookies }) => {
    const sessionId = cookies.sessionId;
    const user = users.find((user) => user.sessionId === sessionId);
    if (!user) {
      return HttpResponse.json(
        { success: false, message: "Inalid UserId" },
        { status: 403 }
      );
    }

    const data = (await request.json()) as NewTask;

    const newTask: Task = {
      ...data,
      userId: user.id,
      id: Date.now().toString(),
      status: "pending",
    };
    tasks.push(newTask);
    return HttpResponse.json({ success: true, newTask }, { status: 201 });
  }),
  //edit an existing task
  http.put("/api/tasks/:taskId", async ({ request, params, cookies }) => {
    const sessionId = cookies.sessionId;
    const user = users.find((user) => user.sessionId === sessionId);
    if (!user) {
      return HttpResponse.json(
        { success: false, message: "Inalid UserId" },
        { status: 403 }
      );
    }
    const { taskId } = params;

    const { title, description, status } = (await request.json()) as EditTask;
    const taskIndex = tasks.findIndex(
      (task) => task.userId === user.id && task.id === taskId
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

    return HttpResponse.json(
      { success: true, task: tasks[taskIndex] },
      { status: 200 }
    );
  }),
  http.delete("/api/tasks/:taskId", ({ params, cookies }) => {
    console.log("Tasks Delete Route");
    const user = users.find((user) => user.sessionId === cookies.sessionId);
    if (!user) {
      return HttpResponse.json(
        { success: false, message: "Invalid UserId" },
        { status: 400 }
      );
    }
    const { taskId } = params;

    const taskIndex = tasks.findIndex(
      (task) => task.userId === user.id && task.id === taskId
    );
    console.log(cookies.sessionId, taskId, taskIndex);
    if (taskIndex < 0)
      return HttpResponse.json(
        {
          success: false,
          message:
            "Either the task ID is invalid or you do not have permission to delete it.",
        },
        { status: 400 }
      );

    tasks.splice(taskIndex, 1);
    return HttpResponse.json({ success: true }, { status: 200 });
  }),
];

// const user = users.find(user=>user.sessionId === sessionId);
//     if(!user){
//       return HttpResponse.json({success:false,message:"Inalid UserId"},{status:403});
//     }
