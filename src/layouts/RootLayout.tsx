import React from "react";
import { Layout } from "antd";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  const { Header, Content } = Layout;
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>

      <Content className="">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default RootLayout;
