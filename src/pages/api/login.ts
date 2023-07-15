import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "src/lib/prismadb";

const loginHandler =async (req: NextApiRequest, res: NextApiResponse) => {
  try { 
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
    const { email, password } = req.body;
    const user = await prismadb.UserTbl.findUnique({
      where: {
        email,
        password
      }
    })

    if (user)    return res.status(200).json(user); 


  }catch(error) {
    return res.status(500).end();
  }


  if (req.method === 'POST') {
    // Get the login credentials from the request body
    const { email, password } = req.body;

    // Perform your login logic here
    // Validate the credentials, check against a database, etc.

    // Example: Simple login check
    if (email === 'user@example.com' && password === 'password') {
      // Successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    // Only accept POST requests
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default loginHandler;
