import type React from "react";
import { useAppSelector } from "../redux_toolkit/store/hooks";
import TaskItem from "./TaskItem";
import type { Task } from "../types/task.types";

type ChildProp = {
  setTask: (task: Task | null) => void;
  deleteTaskBtn: (taskId: string) => void;
};
const ViewTasks: React.FC<ChildProp> = ({ deleteTaskBtn, setTask }) => {
  const { tasks } = useAppSelector((state) => state.tasks);
  return (
    <div className="w-[45%] outline-1 p-1">
      <h3>View Your Tasks Here</h3>
      <hr className="mb-2" />
      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  deleteTaskBtn={deleteTaskBtn}
                  task={task}
                  setTask={setTask}
                />
              );
            })}
          </ul>
        ) : (
          <p>No tasks Yet</p>
        )}
      </div>
    </div>
  );
};

export default ViewTasks;
