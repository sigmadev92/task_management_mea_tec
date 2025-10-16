import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const App: React.FC = () => {
  const { Content } = Layout;

  return (
    <Layout className="layout-2">
      <Navbar />
      <Content className="content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
