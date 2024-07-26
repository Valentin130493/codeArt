import { FC } from "react";
import { Card, Col, Row, Typography } from "antd";

import { Register } from "../../../store/registers/registersSlice.ts";

interface Props extends Register {}

export const RegisterCard: FC<Props> = ({
  registerName,
  balance,
  currencyCode,
}) => {
  return (
    <Col span={6}>
      <Card>
        <Typography.Paragraph>{registerName}</Typography.Paragraph>
        <Row>
          <Typography.Paragraph style={{ marginRight: 4 }}>
            Balance: {balance}
          </Typography.Paragraph>
          <Typography.Paragraph>{currencyCode}</Typography.Paragraph>
        </Row>
      </Card>
    </Col>
  );
};
