import Link from "next/link";
import { useState, useEffect, FC } from "react";
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
import type { MenuProps } from "antd";
import { Dropdown, Menu, Space, Input, Badge, Layout, Row, Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";
import { mappingLang } from "src/const/const";

const { Search } = Input;
const { Sider } = Layout;

const fontSizeIcon = "26px";
const fontSizeBadge = "12px";

interface IHeader {
  isOpenSidebar?: boolean;
  setIsOpenSidebar?: any;
}
const Header: FC<IHeader> = ({}) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const { locale, locales, push, pathname, asPath, query } = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  // control language in top header
  const handleChangeLang = e => {
    push({ pathname, query }, asPath, { locale: e.key });
  };
  const menuLang: MenuProps["items"] = locales.map(locale => ({
    key: locale,
    label: mappingLang[locale],
  }));

  const handleAuth = () => {
    alert("sign in/ sign up");
  };

  // control menu top header
  const menuTopHeader: MenuProps["items"] = [
    {
      key: "lang",
      label: mappingLang[locale],
      children: menuLang,
      onClick: handleChangeLang,
    },
    {
      key: "auth",
      label: "Sign in/Sign up",
      onClick: handleAuth,
    },
  ];

  // handle search
  const onSearch = (value: string) => {
    console.log(value);
    setIsSearching(true);

    // fake search
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleClickHamburger = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const openCart = () => {
    push("/cart");
  };

  // sidebar
  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group",
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuProps["items"] = [
    getItem("Navigation One", "sub1", <MailOutlined />, [
      getItem("Item 1", "g1", null, [getItem("Option 1", "1"), getItem("Option 2", "2")], "group"),
      getItem("Item 2", "g2", null, [getItem("Option 3", "3"), getItem("Option 4", "4")], "group"),
    ]),

    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")]),
    ]),

    { type: "divider" },

    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),

    getItem(
      "Group",
      "grp",
      null,
      [getItem("Option 13", "13"), getItem("Option 14", "14")],
      "group",
    ),
  ];

  const handleClickSidebar: MenuProps["onClick"] = e => {
    console.log("click ", e);
  };

  return (
    <>
      <header>
        <div className="topheader">
          <ul className="menu-top-header-expand">
            <li>
              <Dropdown menu={{ items: menuLang, onClick: handleChangeLang }} trigger={["click"]}>
                <a className="cursor-pointer" onClick={e => e.preventDefault()}>
                  <Space>
                    {mappingLang[locale]}
                    <div className="flex align-center">
                      <DownOutlined />
                    </div>
                  </Space>
                </a>
              </Dropdown>
            </li>
            <li>
              <a href="">Sign in/ Sign up</a>
            </li>
          </ul>

          <ul className="menu-top-header-collapse">
            <li>
              <Dropdown menu={{ items: menuTopHeader }} trigger={["click"]}>
                <a className="cursor-pointer" onClick={e => e.preventDefault()}>
                  <Space>
                    Links
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </li>
          </ul>
        </div>

        <Row justify="center">
          <div id="home">
            <div className="header-left">
              <div id="burger" onClick={handleClickHamburger}>
                <MenuOutlined style={{ fontSize: fontSizeIcon }} />
              </div>
              <a href="/" id="logo">
                <img
                  src="https://s3-us-west-2.amazonaws.com/creatix.io/creatix-new-logo-v1.svg"
                  alt="Logo"
                />
              </a>
            </div>
            <div className="header-center">
              <Search
                placeholder="Search product ..."
                onSearch={onSearch}
                allowClear
                enterButton={
                  <Button style={{ backgroundColor: "#333" }} type="primary">
                    Search
                  </Button>
                }
                loading={isSearching}
                size="large"
              />
            </div>
            <div className="header-right">
              <div className="header-right-wrap-icon">
                <UserOutlined />
              </div>
              <div className="header-right-wrap-icon" onClick={openCart}>
                <Badge style={{ fontSize: fontSizeBadge }} count={5}>
                  <ShoppingCartOutlined style={{ fontSize: fontSizeIcon }} />
                </Badge>
              </div>
            </div>
          </div>

          {/* search in mode mobile */}
          <div className="search-mode-mobile">
            <Search
              placeholder="Search product ..."
              onSearch={onSearch}
              allowClear
              enterButton={
                <Button style={{ backgroundColor: "#333" }} type="primary">
                  Search
                </Button>
              }
              loading={isSearching}
              size="middle"
            />
          </div>
        </Row>

        <div className="menu">
          <ul className="menu-ul">
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Shop</a>
            </li>
            <li>
              <a href="">Retailers</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>
      </header>
      {isOpenSidebar && (
        <div className="sidebar">
          <Sider>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                About
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                Shop
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                Retaiers
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                Contact
              </Menu.Item>
            </Menu>
          </Sider>

          {/* <Menu
            onClick={handleClickSidebar}
            style={{ width: "80%" }}
            // defaultSelectedKeys={["1"]}
            // defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          /> */}
        </div>
      )}
    </>
  );
};

export default Header;
