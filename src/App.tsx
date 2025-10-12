import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./redux_toolkit/store/hooks";
import { fetchLoginStatus } from "./redux_toolkit/reducers/user/userSlice";
import Loader from "./components/Loader";
const App = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      dispatch(fetchLoginStatus());
      setLoader(false);
    }, 500);
  }, []);
  return (
    <div>
      {loader && <Loader />}
      <RouterProvider router={router} />;
    </div>
  );
};

export default App;
