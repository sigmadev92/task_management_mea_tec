// import { useNavigate } from "react-router-dom";
// import { userActions } from "../redux_toolkit/reducers/user/userSlice";
// import { useDispatch} from "react-redux";
// import { useSelectorHook } from "../redux_toolkit/store/store";
import { Header } from "antd/es/layout/layout";
export default function Navbar() {
  // const dispatch = useDispatch();
  // const {loggedIn} = useSelectorHook.user.loggedIn;

  // const itemsVisible=[
  //   {when:"all",label: "Home", key: "/" },

  // ]
  // const navigate = useNavigate();
  // // const dispatch = useAppDispatch();

  // const handleClick = (key: string) => {
  //   if (key === "logout") {
  //     dispatch(userActions.removeUser());
  //     navigate("/login");
  //   } else {
  //     navigate(key);
  //   }
  // };

  return <Header></Header>;
}
