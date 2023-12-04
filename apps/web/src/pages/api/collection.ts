import prisma from 'lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';
const LIMIT = 8;
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getCollections(req, res);
  } else {
    // Handle any other HTTP method
  }
}
const getCollections = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req;
    const page = query.page || 1;
    const whereCondition = {};
    if (query.chain) {
      whereCondition['chain'] = {
        in: (query.chain as string).split(','),
      };
    }
    if (query.userId) {
      whereCondition['created_by'] = query.userId as string;
    }
    const count = await prisma.nft.count({ where: whereCondition });
    const collections = await prisma.collection.findMany({
      where: whereCondition,
      take: LIMIT,
      skip: Number(page) * LIMIT,
      include: {
        user: true,
      },
    });

    return res
      .status(200)
      .json({ data: collections, page: Number(page), totalPages: Math.ceil(count / LIMIT), totalItems: count });
  } catch (error) {
    return res.status(500).json({ message: 'Error in get Collections' });
  }
};
