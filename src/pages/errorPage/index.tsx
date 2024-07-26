import { Button, ConfigProvider, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "../../routes";

const ErrorPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(ROUTES.home);
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSizeHeading1: 88,
          fontSizeHeading2: 32,
          colorSuccess: "#B0B0B1",
          colorWarning: "#9E9EA8",
        },
        components: {
          Button: {
            contentFontSizeLG: 16,
          },
        },
      }}
    >
      <Space
        align={"center"}
        direction={"vertical"}
        style={{ width: "100%", marginTop: "30vh" }}
      >
        <Typography.Title type={"success"}>
          Ops, something went wrong....
        </Typography.Title>
        <Typography.Title type={"warning"} level={2}>
          You can go to home page by clicking on this button
        </Typography.Title>
        <Button
          size={"large"}
          onClick={handleBackClick}
          type={"link"}
          style={{
            marginTop: 20,
          }}
        >
          Go back
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default ErrorPage;
