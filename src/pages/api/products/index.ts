import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "src/lib/prismadb";
import serverAuth from "src/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      return res.status(405).end();
    }

    //TODO:
    // await serverAuth(req, res);

    const products = await prismadb.product.findMany();

    return res.status(200).json(products);
  } catch (error) {
    console.log({ error });
    return res.status(500).end();
  }
}
