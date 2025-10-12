import { userHandlers } from "./userHandler";
import { tasksHandlers } from "./tasksHandler";

export const handlers = [...userHandlers, ...tasksHandlers];
