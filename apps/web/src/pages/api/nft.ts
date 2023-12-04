import prisma from 'lib/prismadb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return getNfts(req, res);
  } else {
    // Handle any other HTTP method
  }
}
const LIMIT = 8;
const getNfts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { query } = req;
    const category = (query.category as string) || '';
    const page = query.page || 1;
    const whereCondition = {};
    if (category) {
      whereCondition['categoryId'] = category;
    }
    if (query.chain) {
      whereCondition['chain'] = {
        in: (query.chain as string).split(','),
      };
    }
    if (query.collections) {
      whereCondition['collectionId'] = {
        in: (query.collections as string).split(','),
      };
    }
    if (query.search) {
      whereCondition['name'] = {
        contains: query.search as string,
      };
    }
    console.log(whereCondition);
    const count = await prisma.nft.count({ where: whereCondition });
    const nfts = await prisma.nft.findMany({
      where: whereCondition,
      take: LIMIT,
      skip: Number(page) * LIMIT,
      include: {
        user: true,
        collection: true,
      },
    });

    return res
      .status(200)
      .json({ data: nfts, page: Number(page), totalPages: Math.ceil(count / LIMIT), totalItems: count });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: 'Error in get NFTs' });
  }
};
