import { userActions } from "../../redux_toolkit/reducers/user/userSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux_toolkit/store/hooks";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
const NavItems = () => {
  const dispatch = useAppDispatch();
  const { loggedIn } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const [menuShow, setMenuShow] = useState<boolean>(false);

  const navItems = [
    { link: "/", label: "Home", shown: true },
    { link: "/dashboard", label: "Dashboard", protected: true },
    { link: "/login", label: "Login", exposed: true },
  ];
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/logout", { credentials: "include" });
    message.success("Logged out Successfully");
    dispatch(userActions.removeUser());
    setMenuShow(false);
    navigate("/login");
  };
  return (
    <nav>
      <ul className="hidden md:flex list-none gap-3">
        {navItems.map((item, idx) => {
          return (
            <li key={idx}>
              <NavLink
                to={item.link}
                className={`border-0 dark:text-white ${
                  item.shown ||
                  (loggedIn && item.protected) ||
                  (!loggedIn && item.exposed)
                    ? "block"
                    : "hidden"
                } ${
                  pathname === item.link ? "border-b-2 border-amber-300" : ""
                }`}
              >
                {item.label}
              </NavLink>
            </li>
          );
        })}
        {loggedIn && (
          <li>
            <button
              onClick={handleLogout}
              className="rounded-md text-white bg-orange-400 hover:bg-amber-300 p-1 px-2 cursor-pointer"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
      <div className="relative md:hidden">
        <button
          onClick={() => setMenuShow((prev: boolean) => !prev)}
          className="p-1 px-2 hover:bg-amber-50 bg-[#e5ecef] rounded-md dark:bg-white cursor-pointer"
        >
          <MenuOutlined style={{ fontSize: 12 }} />
        </button>
        {menuShow && (
          <ul className="flex flex-col bg-white rounded-md dark:bg-gray-700 absolute top-8 right-0 md:hidden list-none gap-1 p-2">
            {navItems.map((item, idx) => {
              return (
                <li key={idx}>
                  <button
                    onClick={() => {
                      navigate(item.link);
                      setMenuShow(false);
                    }}
                    className={`border-0 cursor-pointer  dark:text-white ${
                      item.shown ||
                      (loggedIn && item.protected) ||
                      (!loggedIn && item.exposed)
                        ? "block"
                        : "hidden"
                    } ${
                      pathname === item.link
                        ? "border-b-2 border-amber-300"
                        : ""
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            {loggedIn && (
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-md dark:text-white hover:bg-amber-300 p-1 px-2 cursor-pointer"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavItems;
