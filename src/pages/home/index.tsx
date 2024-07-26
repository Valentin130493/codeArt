import { FC } from "react";
import { Layout, Tabs, TabsProps } from "antd";
import { Registers } from "../../components/registers";
import { Remainders } from "../../components/remaiders";

const HomePage: FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "register",
      label: "Registers",
      children: <Registers />,
    },
    {
      key: "remainders",
      label: "Remainders",
      children: <Remainders />,
    },
  ];
  return (
    <Layout style={{ padding: 32 }}>
      <Tabs defaultActiveKey="1" items={items} />
    </Layout>
  );
};

export default HomePage;
