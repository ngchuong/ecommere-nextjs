import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useRouter } from "next/router";

const BreadcrumbComp: React.FC = () => {
  const { pathname } = useRouter();
  const pathSegments = pathname.split("/").filter(segment => segment !== "");

  let items = [];
  if (pathSegments.length) {
    items = pathSegments.map((item, index) => {
      // last segment can't click
      if (index === pathSegments.length - 1) {
        return {
          title: item,
        };
      }

      return {
        href: `/${pathSegments.slice(0, index + 1).join("/")}`,
        title: item,
      };
    });

    // push home to first array
    items.unshift({
      href: "/",
      title: (
        <>
          <HomeOutlined />
          <span>Home</span>
        </>
      ),
    });
  }

  return <Breadcrumb items={items} />;
};

export default BreadcrumbComp;
