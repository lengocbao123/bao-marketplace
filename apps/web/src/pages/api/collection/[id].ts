import prisma from 'lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getCollection(req, res);
  } else {
    // Handle any other HTTP method
  }
}
const getCollection = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const collection = await prisma.collection.findUniqueOrThrow({
      where: { id: id as string },
      include: {
        user: true,
      },
    });

    return res.status(200).json({ data: collection });
  } catch (error) {
    return res.status(500).json({ message: 'Error in get Collections' });
  }
};
