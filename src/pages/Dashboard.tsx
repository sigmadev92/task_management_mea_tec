import { useState } from "react";
import NewTaskComp from "../components/NewTask";
import ViewTasks from "../components/ViewTasks";
import { taskThunk } from "../redux_toolkit/reducers/task/tasksSlice";
import { useAppDispatch } from "../redux_toolkit/store/hooks";
import { type Task } from "../types/task.types";
import EditTaskComp from "../components/EditTaskComp";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [task, setTask] = useState<Task | null>(null);
  const deleteTaskBtn = (taskId: string) => {
    console.log(taskId);
    dispatch(taskThunk.removeTask(taskId));
  };

  return (
    <main className="p-3 ">
      <h2>Dashboard</h2>
      <section className="md:flex justify-between p-3">
        <ViewTasks deleteTaskBtn={deleteTaskBtn} setTask={setTask} />
        {task ? (
          <EditTaskComp task={task} setTask={setTask} />
        ) : (
          <NewTaskComp />
        )}
      </section>
    </main>
  );
};

export default Dashboard;
