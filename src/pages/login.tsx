import { FC } from "react";
import { Form, Input, Button, Col, Row } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

console.log(1)
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from "next-auth/react";
// import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
// import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { BuiltInProviderType } from "next-auth/providers";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

interface LoginProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

const LoginPage: FC<LoginProps> = ({
          providers,
        }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { t } = useTranslation("login");

  const { callbackUrl } = router.query as {
    callbackUrl?: string;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .trim()
        .lowercase()
        .max(255)
        .required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: values => {
      console.log(values);
      signIn(providers.credentials.id, {
        email: values.email,
        password: values.password,
      });
    },
  });

  const loginWithGoogle = () => {
    signIn(providers.google.id, { callbackUrl });
  };
  const loginWithFacebook = () => {
    signIn(providers.facebook.id, { callbackUrl });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh", padding: "0 20px" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Login</h1>
        </div>

        <Form onFinish={formik.handleSubmit} className="login-form">
          <Form.Item
            label="Email"
            hasFeedback
            validateStatus={formik.errors.email ? "error" : ""}
            help={formik.errors.email}
          >
            <Input
              prefix={<UserOutlined />}
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Input email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            hasFeedback
            validateStatus={formik.errors.password ? "error" : ""}
            help={formik.errors.password}
          >
            <Input.Password
              prefix={<LockOutlined />}
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Input password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>

          {/* <Form.Item>
        <GoogleLogin
          clientId="YOUR_GOOGLE_CLIENT_ID"
          buttonText="Login with Google"
          onSuccess={loginWithGoogle}
          onFailure={error => console.log(error)}
          cookiePolicy={"single_host_origin"}
        />

        <FacebookLogin
          appId="YOUR_FACEBOOK_APP_ID"
          fields="name,email,picture"
          callback={loginWithFacebook}
          textButton="Login with Facebook"
          icon="fa-facebook"
        />
      </Form.Item> */}
        </Form>
      </Col>
    </Row>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const [session, providers, i18n] = await Promise.all([
    getSession(context),
    getProviders(),
    serverSideTranslations(context.locale || "vi", ["common", "login"]),
  ]);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: { providers, ...i18n },
    };
  }

  return {
    props: { providers, ...i18n },
  };
};

export default LoginPage;
