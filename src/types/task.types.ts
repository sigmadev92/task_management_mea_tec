export type TaskStatus = "completed" | "pending";

export type TasksState = {
  tasks: Task[];
};

export type Task = {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
};
export type NewTask = {
  userId: string;
  title: string;
  description: string;
};
export type EditTask = {
  title: string;
  description: string;
  status: TaskStatus;
};
