import Head from "next/head";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import styles from "src/styles/Home.module.css";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { InferGetStaticPropsType } from "next";
import { i18n, useTranslation } from "next-i18next";

import type { MenuProps } from "antd";
import { Dropdown, Menu, Space, Layout } from "antd";
import {
  ShoppingCartOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MenuOutlined,
  DownOutlined,
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("header");

  return (
    <div className={styles.container}>
      <Head>
        <title>Ecommerce Nextjs</title>
      </Head>

      <main>
        {/* {t("test")} */}

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div> */}
      </main>
    </div>
  );
}

export const getStaticProps = async context => {
  // const [session, providers, i18n] = await Promise.all([
  //   getSession(context),
  //   getProviders(),
  //   serverSideTranslations(context.locale || "vi", ["header"]),
  // ]);
  const i18n = await serverSideTranslations(context.locale || "vi", ["header"]);

  console.log(i18n, "test lang");

  // if (session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //     props: { providers, ...i18n },
  //   };
  // }

  return {
    props: { ...i18n },
  };
};
