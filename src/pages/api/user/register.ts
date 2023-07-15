import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "src/lib/prismadb";
import { hashPassword } from "src/utils/auth";

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;

  try {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method Not Allowed" });
    }

    const pwdHash = await hashPassword(data.password);

    const result = await prismadb.UserTbl.create({
      data: {
        username: data.username,
        name: data.name,
        email: data.email.toLowerCase().trim(),
        phone_number: data.phoneNumber,
        address: data.address,
        password: pwdHash,
        // role: "user",
      },
    });

    res.status(200).json({ email: result.email, name: result.name });
  } catch (error) {
    res.status(400).json({
      error: {
        name: error instanceof Error ? error.name : "Unknown Error",
        message: error instanceof Error ? error.message : "",
      },
    });
  }
};

export default loginHandler;
