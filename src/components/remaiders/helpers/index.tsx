import { Typography } from "antd";

export const getStatus = (status: number) => {
  switch (status) {
    case 0: {
      return <Typography.Paragraph>All</Typography.Paragraph>;
    }
    case 1: {
      return <Typography.Paragraph>Open</Typography.Paragraph>;
    }
    case 2: {
      return <Typography.Paragraph>In progress</Typography.Paragraph>;
    }
    case 3: {
      return <Typography.Paragraph>Done</Typography.Paragraph>;
    }
    default: {
      return null;
    }
  }
};
