import prisma from 'lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getUser(req, res);
  } else {
  }
}
const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: userId as string },
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error in get User' });
  }
};
