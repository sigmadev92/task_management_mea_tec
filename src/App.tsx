import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux_toolkit/store/hooks";
import { fetchLoginStatus } from "./redux_toolkit/reducers/user/userSlice";
import { taskThunk } from "./redux_toolkit/reducers/task/tasksSlice";
import Loader from "./components/Loader";
const App = () => {
  const [loader, setLoader] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      dispatch(fetchLoginStatus());
      setLoader(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (user) dispatch(taskThunk.fetchAllTasks());
  }, [user]);
  return (
    <div>
      {loader && <Loader />}
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
