import React, { useEffect, useState } from "react";
import { Layout, Menu, message } from "antd";
import type { MenuProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { userActions } from "../redux_toolkit/reducers/user/userSlice";
import { useAppSelector, useAppDispatch } from "../redux_toolkit/store/hooks";
// import DarkModeToggle from "../components/DarkModeToggle";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const user = useAppSelector((state) => state.user);
  const [items, setItems] = useState<MenuProps["items"]>([]);

  const { Content } = Layout;
  const navigate = useNavigate();

  useEffect(() => {
    if (user.loggedIn) {
      setItems([
        { key: "/", label: "Home" },
        { key: "/dashboard", label: "Dashboard" },
        { key: "logout", label: "Logout" },
      ]);
    } else {
      setItems([
        { key: "/", label: "Home" },
        { key: "/login", label: "Login" },
      ]);
    }
  }, [user]);

  const handleNav = (info: { key: string }) => {
    if (info.key === "logout") {
      handleLogout();
    } else navigate(info.key);
  };
  const handleLogout = async () => {
    await fetch("/api/logout", { credentials: "include" });

    dispatch(userActions.removeUser());
    message.success("logged Out successfullly");
    navigate("/login");
  };

  return (
    <Layout className="layout-2">
      <nav className="flex justify-between items-center p-4">
        <div id="info" className="flex gap-1 items-center">
          <div
            id="logo"
            className="w-[2rem] h-[2rem] rounded-full overflow-hidden"
          >
            <img
              src="/mea_tec_inc_logo.jpg"
              alt="company"
              className="w-full h-full"
            />
          </div>
          <div
            id="text"
            className="flex flex-col justify-center gap-0.5 h-[90%]"
          >
            <h1>Tasker</h1>
            <p className="font-bold text-[0.9rem]">by MEA Tec</p>
          </div>
        </div>
        {/* <button onClick={() => console.log(user)}>click</button> */}
        <div className="flex gap-2 items-center">
          {/* <DarkModeToggle /> */}
          <Menu
            theme="dark"
            onClick={handleNav}
            mode="horizontal"
            defaultSelectedKeys={[location.pathname]}
            items={items}
          />
        </div>
      </nav>

      <Content className="content dark">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
