import { FC, useEffect, useMemo, useState } from "react";

import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { Forest } from "../../store/userSlice/userSLice.ts";
import {
  addRegisters,
  getRegisters,
  setRegisters,
} from "../../store/registers/registersSlice.ts";
import { RegisterCard } from "./ui/Card.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { currSelectOptions } from "../../static/options.ts";

export const Registers: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const register = useAppSelector((state) => state.registers.register);
  const dispatch = useAppDispatch();
  const [forestId, setForestId] = useState(user.forestIds[0].forestId ?? "1");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const options = useMemo(() => {
    return (
      (user &&
        user?.forestIds?.map((item: Forest) => {
          return {
            value: item.forestId,
            name: item.forestName,
          };
        })) ||
      []
    );
  }, [user]);

  const handeChange = (value: string) => {
    setForestId(value);
  };

  const handleClick = () => {
    dispatch(getRegisters({ selectedForestId: forestId }));
  };

  const handleFinish = (values: {
    currencyId: string;
    registerName: string;
  }) => {
    const data = {
      selectedForestId: forestId,
      requestBody: {
        ...values,
      },
    };
    dispatch(addRegisters(data));
    dispatch(setRegisters(values));
    handleCancel();
    form.resetFields();
  };

  useEffect(() => {
    dispatch(getRegisters({ selectedForestId: forestId }));
  }, [forestId]);

  return (
    <Flex vertical>
      <Row
        style={{ width: "100%", margin: "20px auto" }}
        justify={"center"}
        gutter={16}
      >
        <Col>
          <Button onClick={handleOpen} disabled={!register.length}>
            add register
          </Button>
        </Col>
        <Col span={8}>
          <Flex align={"center"} gap={4}>
            <Typography.Paragraph style={{ margin: 0 }}>
              Select forest id:
            </Typography.Paragraph>
            <Select
              placeholder={"Choose forest id"}
              value={forestId}
              onChange={handeChange}
              options={options}
              allowClear
              style={{ width: "70%" }}
            />
          </Flex>
        </Col>
        <Col>
          <Button
            htmlType={"button"}
            onClick={handleClick}
            disabled={user.forestIds.length === 1}
          >
            Get registers
          </Button>
        </Col>
      </Row>

      <Row style={{ maxWidth: "80wv" }} wrap gutter={[16, 16]}>
        {register.map((item, index) => {
          return <RegisterCard key={index} {...item} />;
        })}
      </Row>

      <Modal
        title="Add Register Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form form={form} onFinish={handleFinish} layout={"vertical"}>
          <Form.Item
            label="Rigister name"
            name="registerName"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Currency"
            name="currencyId"
            rules={[{ required: true, message: "Please select currency" }]}
          >
            <Select options={currSelectOptions} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};
