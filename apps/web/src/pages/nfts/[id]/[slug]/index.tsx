import { NextSeo } from 'next-seo';
import { Fragment, ReactElement } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb } from 'components/molecules';
import {
  ProductInfo,
  ProductImage,
  ProductExchange,
  ProductDetails,
  ProductProperties,
  ProductSaleHistory,
  ProductSimilar,
  ProductOfferHistory,
} from 'components/organisms';
import { NextPageWithLayout } from 'pages/_app';
import { InferGetServerSidePropsType } from 'next';
import { fetcher } from 'lib/utils/fetcher';
import useSWR from 'swr';
import { convertToSlug } from 'lib/utils/string';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

export async function getServerSideProps({ req, res, query }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const fetchApi = fetcher(session);
  const { id } = query;
  const [nft, relativeNfts] = await Promise.all([fetchApi(`/nfts/${id}`), fetchApi(`/nfts?_limit=4`)]);

  return {
    props: {
      id,
      fallback: {
        [`/nfts/${id}`]: nft,
        '/nfts?_limit=4': relativeNfts,
      },
    },
  };
}

const Index: NextPageWithLayout = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: nft, error: errorNfts } = useSWR(`/nfts/${id}`);
  const { data: relativeNfts, error: errorRelativeNfts } = useSWR(`/nfts?_limit=4`);

  const hasOrder = nft.order;
  if (errorNfts || errorRelativeNfts) {
    return <div>failed to load</div>;
  }

  if (!nft) {
    return <div>loading...</div>;
  }

  return (
    <Fragment>
      <NextSeo title="Product Details" />
      <Breadcrumb
        className="bg-neutral-10 mb-7.5 py-2.5"
        links={[
          { label: 'Collections', href: '/collections', as: '/collections' },
          {
            label: nft.collection.name,
            as: `/collections/${nft.collection.id}/${convertToSlug(nft.collection.name)}`,
            href: '/collections/[id]/[slug]',
          },
          { label: nft.name, href: '/', as: '/' },
        ]}
      />
      <div className="gap-y-7.5 container grid grid-cols-5 gap-x-6">
        {/* Start Desktop Screen */}
        <div className="gap-y-7.5 col-span-2 hidden flex-col sm:flex">
          <ProductImage alt={nft.name} image={nft.image} />
          {nft.attributes?.length > 0 && <ProductProperties properties={nft.attributes} />}
        </div>
        <div className="gap-y-7.5 col-span-3 hidden flex-col sm:flex">
          <ProductInfo className="w-full" nft={nft} />
          {hasOrder && <ProductExchange className="w-full" order={nft.order} />}
          <ProductDetails className="w-full" />
        </div>
        {/* End Desktop Screen*/}

        {/* Start Mobile Screen */}
        <div className="gap-y-7.5 col-span-5 flex flex-col sm:hidden">
          <ProductInfo className="col-span-5" nft={nft} />
          <ProductImage className="col-span-5" alt={nft.name} image={nft.image} />
          {hasOrder && <ProductExchange className="col-span-5" order={nft.order} />}
          <ProductDetails className="col-span-5" />
          {nft.attributes?.length > 0 && <ProductProperties className="col-span-5" properties={nft.attributes} />}
        </div>
        {/* End Mobile Screen*/}
        <ProductOfferHistory className="mt-7.5 col-span-5" />
        <ProductSaleHistory className="mt-7.5 col-span-5" sales={nft.order.prices} />
        <ProductSimilar className="mt-7.5 col-span-5" products={relativeNfts} />
      </div>
    </Fragment>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
