import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux_toolkit/store/hooks";
import { fetchLoginStatus } from "./redux_toolkit/reducers/user/userSlice";
import { taskThunk } from "./redux_toolkit/reducers/task/tasksSlice";
import { themeActions } from "./redux_toolkit/reducers/theme/themeSlice";
import Loader from "./components/Loader";
const App = () => {
  const [loader, setLoader] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  // const {theme} = useAppSelector((state)=>state.theme);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const storedTheme = localStorage.getItem("task_Theme") || "light";
    dispatch(themeActions.loadTheme(storedTheme));

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
    <div className="relative h-[100%]">
      {loader && <Loader />}
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
