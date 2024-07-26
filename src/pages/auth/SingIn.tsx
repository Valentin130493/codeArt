import { Button, Form, Input, Layout } from "antd";
import { FormValues } from "../../components/auth/types.ts";
import { authLogin } from "../../store/userSlice/userSLice.ts";
import { useAppDispatch } from "../../store";
import { ROUTES } from "../../routes";
import { useNavigate } from "react-router";
import { TOKEN } from "../../static/storage.ts";
import { useEffect } from "react";

const SingIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem(TOKEN);

  useEffect(() => {
    if (token) {
      navigate(ROUTES.home);
    }
  }, [navigate, token]);

  const handleFinish = (values: FormValues) => {
    dispatch(authLogin(values));
    navigate(ROUTES.home);
  };

  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        style={{ maxWidth: 320, width: "100%" }}
        onFinish={handleFinish}
        autoComplete="off"
        layout={"vertical"}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default SingIn;
