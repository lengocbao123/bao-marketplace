import { NextSeo } from 'next-seo';
import { Fragment, ReactElement } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb } from 'components/molecules';
import {
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductProperties,
  ProductSimilar,
  ProductOfferHistory,
  ProductSaleHistory,
  ProductExchange,
} from 'components/organisms';
import { NextPageWithLayout } from 'pages/_app';
import { InferGetServerSidePropsType } from 'next';
import { convertToSlug } from 'lib/utils/string';
import prisma from 'lib/prismadb';
import { Nft, Collection, User } from '@prisma/client';
import { getNftPrice } from 'lib/utils/nft';

export async function getServerSideProps({ req, res, query }) {
  const { id } = query;
  const [nft, relativeNfts] = await Promise.all([
    prisma.nft.findUnique({
      where: { id },
      include: {
        collection: true,
        user: true,
      },
    }),
    prisma.nft.findMany({
      take: 10,
      include: {
        collection: true,
        user: true,
      },
    }),
  ]);

  return {
    props: {
      id,
      nft: JSON.stringify(nft),
      relativeNfts: JSON.stringify(relativeNfts),
    },
  };
}

const Index: NextPageWithLayout = ({ nft, relativeNfts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const nftData = JSON.parse(nft) as Nft & { collection: Collection; user: User };

  return (
    <Fragment>
      <NextSeo title={nftData.name} />
      <Breadcrumb
        className="bg-neutral-10 mb-7.5 py-2.5"
        links={[
          { label: 'Collections', href: '/collections', as: '/collections' },
          {
            label: nftData.collection.name,
            as: `/collections/${nftData.collection.id}/${convertToSlug(nftData.collection.name)}`,
            href: '/collections/[id]/[slug]',
          },
          { label: nftData.name, href: '/', as: '/' },
        ]}
      />

      <div className="gap-y-7.5 container grid grid-cols-5 gap-x-6">
        <div className="gap-y-7.5 col-span-2 hidden flex-col sm:flex">
          <ProductImage alt={nftData.name} image={nftData.image} />
          {nftData.attributes?.length > 0 && <ProductProperties properties={[]} />}
        </div>
        <div className="gap-y-7.5 col-span-3 hidden flex-col sm:flex">
          <ProductInfo className="w-full" nft={nftData} />
           {/* <ProductExchange className="w-full" data={100} nftId={nftData.id} /> */}
          <ProductDetails nft={nftData} className="w-full" />
        </div>
        <ProductOfferHistory className="mt-7.5 col-span-5" />
        <ProductSaleHistory className="mt-7.5 col-span-5" sales={[]} />
        <ProductSimilar
          loading={false}
          isError={false}
          className="mt-7.5 col-span-5"
          products={JSON.parse(relativeNfts) as Array<Nft & { collection: Collection; user: User }>}
          collection={nftData.collection}
        />
      </div>
    </Fragment>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
