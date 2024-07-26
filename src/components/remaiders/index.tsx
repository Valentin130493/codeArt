import { FC, memo, useMemo, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Table,
  TableProps,
  Typography,
} from "antd";
import { EditFilled } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store";
import { Forest } from "../../store/userSlice/userSLice.ts";
import dayjs from "dayjs";
import {
  addRemainder,
  getRemainders,
  Reminder,
  setRemainders,
  setSelectedRemainder,
  updateCurrentRemainderStatus,
  updateRemainderStatus,
} from "../../store/remainders/remaildersSlice.ts";
import { statusSelectOptions } from "../../static/options.ts";
import { getStatus } from "./helpers";

const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

export const Remainders: FC = memo(() => {
  const user = useAppSelector((state) => state.user.user);
  const remainders = useAppSelector((state) => state.remainders.reminders);
  const currentRemainder = useAppSelector(
    (state) => state.remainders.selectedRemainder,
  );
  const [form] = Form.useForm();
  const [updateForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const [forestId, setForestId] = useState(user.forestIds[0].forestId ?? "1");
  const [statusId, setStatusId] = useState("0");
  const [date, setDate] = useState(["2024-01-25", "2024-11-25"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangeStatusModal, setIsChangeStatusModal] = useState(false);
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
  const handleStatusChange = (value: string) => {
    setStatusId(value);
  };
  const handleDateChange = (_: any, dateStrings: [string, string]) => {
    setDate(dateStrings);
  };
  const handleAddRemainder = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => setIsModalOpen(false);

  const handleGetRemainder = () => {
    const data = {
      selectedForestId: forestId,
      requestBody: {
        startDate: date[0],
        endDate: date[1],
        status: statusId,
      },
    };
    dispatch(getRemainders(data));
  };
  const handleFinish = (values: {
    date: string;
    content: string;
    title: string;
    isPersonal: boolean;
    isGeneral: boolean;
  }) => {
    const { date, ...restValues } = values;
    const remainderData = {
      selectedForestId: forestId,
      requestBody: {
        ...restValues,
        date: dayjs(date).format(dateFormat),
        isGeneral: !values.isPersonal,
      },
    };

    dispatch(addRemainder(remainderData));
    dispatch(
      setRemainders({
        ...restValues,
        date: dayjs(date).format(dateFormat),
        isGeneral: !values.isPersonal,
      }),
    );
    form.resetFields();
    setIsModalOpen(false);
  };
  const handleEditClick = (id: number) => {
    setIsChangeStatusModal(true);
    dispatch(setSelectedRemainder(id));
  };
  const handleCloseChangeStatusModal = () => {
    setIsChangeStatusModal(false);
    dispatch(setSelectedRemainder(null));
  };

  const handleSubmitStatus = (values: { status: string }) => {
    const updateStatusData = {
      selectedForestId: forestId,
      requestBody: {
        reminderId: String(currentRemainder),
        ...values,
      },
    };
    dispatch(updateRemainderStatus(updateStatusData));
    dispatch(
      updateCurrentRemainderStatus({
        reminderId: String(currentRemainder),
        ...values,
      }),
    );

    updateForm.resetFields();
    setIsChangeStatusModal(false);
    dispatch(setSelectedRemainder(null));
    handleGetRemainder();
  };

  const columns: TableProps<Reminder>["columns"] = [
    {
      title: "ID",
      dataIndex: "reminderId",
      key: "id",
      width: "5%",
      sorter: { compare: (a, b) => a.forestId + b.forestId },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "User Name",
      dataIndex: "createUserName",
      key: "createUserName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        return getStatus(status);
      },
    },
    {
      title: "Personal",
      dataIndex: "isPersonal",
      key: "isPersonal",
      render: (status: boolean) => {
        return `${status}`;
      },
    },
    {
      title: "General",
      dataIndex: "isGeneral",
      key: "isGeneral",
      render: (status: boolean) => {
        return `${status}`;
      },
    },
    {
      render: (entity: Reminder) => {
        return (
          <Button
            type={"default"}
            onClick={() => handleEditClick(entity.reminderId)}
          >
            <EditFilled />
          </Button>
        );
      },
      width: "36px",
    },
  ];

  return (
    <Flex vertical>
      <Row
        style={{ width: "100%", margin: "20px auto" }}
        justify={"center"}
        gutter={16}
      >
        <Col>
          <RangePicker
            defaultValue={[
              dayjs("2024-01-25", dateFormat),
              dayjs("2024-11-25", dateFormat),
            ]}
            onChange={handleDateChange}
            format={dateFormat}
          />
        </Col>
        <Col span={8}>
          <Flex align={"center"} gap={4}>
            <Select
              placeholder={"Choose forest id"}
              value={statusId}
              onChange={handleStatusChange}
              options={statusSelectOptions}
              allowClear
              style={{ width: "40%" }}
            />
            <Typography.Paragraph style={{ margin: 0 }}>
              Select forest id:
            </Typography.Paragraph>

            <Select
              placeholder={"Choose forest id"}
              value={forestId}
              onChange={handeChange}
              options={options}
              allowClear
              style={{ width: "30%" }}
            />
          </Flex>
        </Col>
        <Col>
          <Button htmlType={"button"} onClick={handleGetRemainder}>
            Get remainders
          </Button>
        </Col>
        <Col>
          {" "}
          <Button
            htmlType={"button"}
            type={"primary"}
            onClick={handleAddRemainder}
          >
            add remainder
          </Button>
        </Col>
      </Row>
      <Table<Reminder>
        rowKey={"id"}
        pagination={false}
        dataSource={remainders}
        columns={columns}
      />

      <Modal
        title="Add Remainder Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}
      >
        <Form form={form} onFinish={handleFinish} layout={"vertical"}>
          <Form.Item
            label="Remaider Title"
            name="title"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input content" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select date" }]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>

          <Form.Item
            label="Personal"
            name="isPersonal"
            rules={[
              {
                required: true,
                message: "Please select is remainder personal or not",
              },
            ]}
          >
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Change Remainder status Modal"
        open={isChangeStatusModal}
        onCancel={handleCloseChangeStatusModal}
        footer={<></>}
      >
        <Form
          form={updateForm}
          onFinish={handleSubmitStatus}
          layout={"vertical"}
        >
          <Form.Item
            label="Select new status"
            name="status"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Select
              placeholder={"Select status"}
              options={statusSelectOptions}
            />
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
});
