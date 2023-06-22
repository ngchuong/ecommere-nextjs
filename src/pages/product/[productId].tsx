import React, { useState } from "react";
// import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
// import useMovie from "hooks/useMovie";
import { Button, MenuProps, RadioChangeEvent } from "antd";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Col,
  Divider,
  Row,
  Typography,
  InputNumber,
  Radio,
  Space,
  Card,
} from "antd";
import ImageGallery from "react-image-gallery";

import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import _ from "lodash";

import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";

import useDetailProduct from "src/hooks/useDetailProduct";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const { Group: GroundRadio, Button: ButtonRadio } = Radio;

// const items2: MenuProps["items"] = [1, 22, 3].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     // icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

const ProductDetail = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("productDetail");
  const router = useRouter();
  const { productId } = router.query;

  const { data, isLoading } = useDetailProduct(productId);
  // if (isLoading || !data) {
  //   //TODO:
  //   return <>Loading</>;
  // }

  const productVariant = data?.productVariant || [];
  console.log(222, data);

  const optionsColor = _.uniqWith(
    productVariant?.map((el, index) => ({
      label: el.color,
      value: el.color,
    })),
    _.isEqual,
  );

  const firtsProductVariant = productVariant?.at(0);
  const [dataProduct, setDataProduct] = useState({
    color: firtsProductVariant?.color,
    size: firtsProductVariant?.size,
    remainAmount: firtsProductVariant?.quantity,
  });

  const optionsSize = productVariant
    ?.filter(el => el.color === dataProduct.color)
    .map(el => ({ label: el.size, value: el.size }));

  // TODO: fake data
  const initState = {
    showIndex: true,
    showBullets: false,
    infinite: true,
    showThumbnails: true,
    showFullscreenButton: false,
    // showGalleryFullscreenButton: true,
    showPlayButton: false,
    // showGalleryPlayButton: false,
    showNav: false,
    isRTL: false,
    slideDuration: 450,
    slideInterval: 2000,
    slideOnThumbnailOver: false,
    thumbnailPosition: "bottom",
    showVideo: {},
    useWindowKeyDown: true,
  };

  const stateItem = {
    // originalWidth: 400,
    // thumbnailHeight: 200,
    // thumbnailWidth: 300,
  };

  const images2 = [
    {
      original:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_1_300x300_a41bf80b40.jpg",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_1_300x300_a41bf80b40.jpg",
      ...stateItem,
    },
    {
      original:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_4d585cfd35.jpg",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_2_300x300_4d585cfd35.jpg",
      ...stateItem,
    },
    {
      original:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_3_300x300_0a0f9518be.jpg",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_3_300x300_0a0f9518be.jpg",
      ...stateItem,
    },
    {
      original:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_4_300x300_48da39ab39.jpg",
      thumbnail:
        "https://d-themes.com/react_asset_api/molla/uploads/product_1_4_300x300_48da39ab39.jpg",
      ...stateItem,
    },
  ];

  // handle
  const handleChangeColor = ({ target: { value } }: RadioChangeEvent) => {
    const firstVariant = productVariant.find(el => el.color === value);
    setDataProduct({
      ...dataProduct,
      color: value,
      size: firstVariant.size,
      remainAmount: firstVariant?.quantity,
    });
  };
  const handleChangeSize = ({ target: { value } }: RadioChangeEvent) => {
    const findVariant = productVariant.find(
      el => el.color === dataProduct.color && el.size === value,
    );
    setDataProduct({ ...dataProduct, size: value, remainAmount: findVariant?.quantity });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%" }}>
        <Card style={{ marginBottom: 20 }}>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            {/* <Sider style={{ background: "#ccc" }} width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
          items={items2}
        />
      </Sider> */}
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={12}>
                  <ImageGallery {...initState} items={images2} />
                </Col>
                <Col className="gutter-row" span={12}>
                  <Row>
                    <Title level={3}>{data?.name}</Title>
                  </Row>
                  <Row>
                    <Text>$ {data?.price}</Text>
                  </Row>
                  <Row>
                    <Text type="secondary">{data?.description}</Text>
                  </Row>
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    align={"middle"}
                    style={{ marginTop: 10 }}
                  >
                    <Col className="gutter-row" span={6}>
                      Color
                    </Col>
                    <Col className="gutter-row">
                      <GroundRadio
                        options={optionsColor}
                        onChange={handleChangeColor}
                        value={dataProduct.color}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </Col>
                  </Row>
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    align={"middle"}
                    style={{ marginTop: 10 }}
                  >
                    <Col className="gutter-row" span={6}>
                      Size
                    </Col>
                    <Col className="gutter-row">
                      <GroundRadio
                        options={optionsSize}
                        onChange={handleChangeSize}
                        value={dataProduct.size}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </Col>
                  </Row>
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    align={"middle"}
                    style={{ marginTop: 10 }}
                  >
                    <Col className="gutter-row" span={6}>
                      Remain qty
                    </Col>
                    <Col className="gutter-row">{dataProduct.remainAmount}</Col>
                  </Row>
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    align={"middle"}
                    style={{ marginTop: 10 }}
                  >
                    <Col className="gutter-row" span={6}>
                      Qty
                    </Col>
                    <Col className="gutter-row">
                      <InputNumber
                        size="large"
                        min={1}
                        max={100000}
                        defaultValue={3}
                        // onChange={onChange}
                      />
                    </Col>
                  </Row>
                  <Row
                    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                    align={"middle"}
                    style={{ marginTop: 10 }}
                  >
                    <Col className="gutter-row" span={6}>
                      Category:
                    </Col>
                    <Col className="gutter-row">tuis, quan, ao</Col>
                  </Row>
                  <Divider />
                  <Row>
                    <Space wrap>
                      <Button size="large" icon={<ShoppingCartOutlined />}>
                        Thêm vào giỏ hàng
                      </Button>
                      <Button size="large" type="primary">
                        Mua ngay
                      </Button>
                    </Space>
                  </Row>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Card>

        <Card title="Detail product" style={{ marginBottom: 20 }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat
          mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper
          suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam
          porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices
          nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique
          cursus. Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit. Vivamus finibus
          vel mauris ut vehicula. Nullam a magna porttitor, dictum risus nec, faucibus sapien. Lorem
          ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis
          eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit,
          posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris
          sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh.
          Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus.
        </Card>
        <Card style={{ marginBottom: 20 }} title={t("titleReview")}>
          Review
        </Card>
      </div>
    </div>
  );
};

export const getStaticProps = async context => {
  // const [session, providers, i18n] = await Promise.all([
  //   getSession(context),
  //   getProviders(),
  //   serverSideTranslations(context.locale || "vi", ["header"]),
  // ]);
  const i18n = await serverSideTranslations(context.locale || "vi", ["productDetail"]);

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
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export default ProductDetail;
