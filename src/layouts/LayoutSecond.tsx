import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { userActions } from "../redux_toolkit/reducers/user/userSlice";
import { useAppSelector, useAppDispatch } from "../redux_toolkit/store/hooks";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const [items, setItems] = useState<MenuProps["items"]>([]);

  const { Header, Content } = Layout;
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
    navigate("/login");
  };

  return (
    <Layout className="layout-2">
      <Header className="navbar">
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

        <Menu
          className="nav"
          theme="light"
          onClick={handleNav}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Header>
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
