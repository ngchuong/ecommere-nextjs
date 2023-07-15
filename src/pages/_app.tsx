import "/src/styles/globals.css";
import "src/styles/header.scss";
import { appWithTranslation } from "next-i18next";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/cache";
import Layout from "src/components/layout";

import LoginPage from "./login";
import RegistrationPage from "./register";

// wrap to translation
const InnerApp = appWithTranslation(({ Component, pageProps: { session, ...pageProps } }) => {
  if (Component === LoginPage || Component === RegistrationPage) {
    return <Component {...pageProps} />;
  }
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
});

// const App = (props) => (
//   <SessionProvider
//     session={props.pageProps.session}
//     refetchInterval={10 * 60} // 10 min
//     refetchOnWindowFocus={true}
//   >
//     <InnerApp {...props} />
//   </SessionProvider>
// );

export default InnerApp;
