import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";

import useAllProduct from "src/hooks/useAllProduct";

const ProductList = props => {
  const router = useRouter();
  const { data = [] } = useAllProduct();

  return (
    <>
      {data?.map((el, index) => {
        return (
          <div
            style={{ border: "1px solid #ccc", margin: 5 }}
            key={index}
            onClick={() => router.push(`/product/${el.id}`)}
          >
            <div>{el.id}</div>
            <div>{el.name}</div>
            <div>{el.description}</div>
            <div>{el.price}</div>
            <div>{el.quantity}</div>
          </div>
        );
      })}
    </>
  );
};

export default ProductList;
