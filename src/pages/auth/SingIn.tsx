import {Button, Form, Input, Layout} from "antd";
import {useAuth} from "../../components/auth/hooks/useAuth.ts";

const SingIn = () => {

    const {singIn} = useAuth()

    return (
        <Layout style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            "justifyContent": "center"
        }}>
            <Form
                style={{maxWidth: 320, width: '100%'}}
                onFinish={singIn}
                autoComplete="off"
                layout={'vertical'}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
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