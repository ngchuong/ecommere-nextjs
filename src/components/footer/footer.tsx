import React from "react";
import { Layout, Row, Col, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <Row justify="center">
        <Col xs={24} sm={12} md={8}>
          <Text>Buff boutique</Text>
          <br />
          <Text>Address Line 1</Text>
          <br />
          <Text>Address Line 2</Text>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Text>Email: example@example.com</Text>
          <br />
          <Text>Phone: +123456789</Text>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Text>© 2023 Buff boutique. All rights reserved.</Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
