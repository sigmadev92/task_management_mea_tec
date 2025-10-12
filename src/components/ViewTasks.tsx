import { useAppSelector } from "../redux_toolkit/store/hooks";

function ViewTasks() {
  const tasks = useAppSelector((state) => state.tasks);
  return (
    <div className="w-[45%]">
      <h3>View Your Tasks Here</h3>
      <hr />
      <div>
        {tasks.list.length > 0 ? (
          <ul>
            {tasks.list.map((task) => {
              return (
                <li key={task.id} className="outline-1 rounded-[0.4rem] mb-2 ">
                  <p>{task.title}</p>
                  <p className="text-[0.7rem] text-green-500">
                    {task.completed ? (
                      <span>Completed</span>
                    ) : (
                      <span className="text-red-500">Not Completed</span>
                    )}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No tasks Yet</p>
        )}
      </div>
    </div>
  );
}

export default ViewTasks;
