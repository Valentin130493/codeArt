import { FC } from "react";
import { Layout as BaseLayout } from "antd";
import { Header } from "./Header.tsx";
import { Outlet } from "react-router";

const MainLayout: FC = () => {
  return (
    <BaseLayout style={{ minHeight: "100vh", minWidth: "100%" }}>
      <Header />
      <Outlet />
    </BaseLayout>
  );
};

export default MainLayout;
