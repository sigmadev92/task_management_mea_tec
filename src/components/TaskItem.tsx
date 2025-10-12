import type { Task } from "../types/task.types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

type ChildProps = {
  task: Task;
  setTask: (task: Task | null) => void;
  deleteTaskBtn: (taskId: string) => void;
};
const TaskItem: React.FC<ChildProps> = ({ task, deleteTaskBtn, setTask }) => {
  return (
    <li
      key={task.id}
      className="outline-1 flex justify-between items-center rounded-[0.4rem] mb-2 p-1  hover:shadow-xl px-3"
    >
      <div>
        <h3 className="font-bold text-2xl">{task.title}</h3>
        <p>{task.description}</p>
      </div>

      <div className="flex gap-4 ">
        {task.status === "completed" ? (
          <p className="text-[0.7rem] text-green-500">Completed</p>
        ) : (
          <p className="text-[0.7rem] text-orange-400">Pending</p>
        )}

        <EditOutlined
          onClick={() => setTask(task)}
          className="icon icon-edit"
        />
        <DeleteOutlined
          onClick={() => deleteTaskBtn(task.id)}
          className="icon icon-del"
        />
      </div>
    </li>
  );
};

export default TaskItem;
