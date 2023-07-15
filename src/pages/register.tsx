import { Form, Input, Button, Layout, Row, Col } from "antd";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import get from "lodash/get";

const RegistrationPage = props => {
  const { Content } = Layout;

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      address: Yup.string().required("Address is required"),
      phoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async values => {
      console.log(values); // You can replace this with your registration logic
      let response;
      try {
        response = await axios.post("/api/user/register", values).then(res => res);
      } catch (error) {
        // setErrMsg("msgRegisterFailed");
      }

      if (response && response.status === 200) {
        formik.handleReset(null);
      }
    },
  });

  return (
    <Layout>
      <Content style={{ minHeight: "100vh", padding: "20px" }}>
        <Row justify="center" align="middle" style={{ minHeight: "100%" }}>
          <Col xs={20} sm={16} md={12} lg={8}>
            <Form onFinish={formik.handleSubmit}>
              <Form.Item
                label="Username"
                hasFeedback
                validateStatus={formik.errors.username ? "error" : ""}
                help={formik.errors.username}
              >
                <Input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Name"
                hasFeedback
                validateStatus={formik.errors.name ? "error" : ""}
                help={formik.errors.name}
              >
                <Input
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                hasFeedback
                validateStatus={formik.errors.email ? "error" : ""}
                help={formik.errors.email}
              >
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                hasFeedback
                validateStatus={formik.errors.password ? "error" : ""}
                help={formik.errors.password}
              >
                <Input.Password
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                hasFeedback
                validateStatus={formik.errors.confirmPassword ? "error" : ""}
                help={formik.errors.confirmPassword}
              >
                <Input.Password
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Address"
                hasFeedback
                validateStatus={formik.errors.address ? "error" : ""}
                help={formik.errors.address}
              >
                <Input
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Phone number"
                hasFeedback
                validateStatus={formik.errors.phoneNumber ? "error" : ""}
                help={formik.errors.phoneNumber}
              >
                <Input
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default RegistrationPage;
