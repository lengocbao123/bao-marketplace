import prisma from 'lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getCategories(req, res);
  } else {
    // Handle any other HTTP method
  }
}
const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const categories = await prisma.category.findMany({ take: 100 });

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Error in get NFTs' });
  }
};
