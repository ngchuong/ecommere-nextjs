import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "src/lib/prismadb";
import serverAuth from "src/lib/serverAuth";

// TODO: decrypt Id product
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    const { productId } = req.query;

    // if (typeof productId !== "string") {
    //   throw new Error("Invalid Id");
    // }

    if (!productId) {
      throw new Error("Missing Id");
    }

    const productDetail = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
    });

    const productVariant = await prismadb.ProductVariant.findMany({
      where: {
        product_id: productId,
      },
    });

    // const productImage = await prismadb.ProductVariant.findMany({
    //   where: {
    //     product_id: productId,
    //   },
    // });

    // console.log(productDetail, productVariant, productImage);

    const responseData = { ...productDetail, productVariant };
    return res.status(200).json(responseData);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
