import { NextSeo } from 'next-seo';
import { Fragment, ReactElement } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb, DetailNftSkeleton, Error } from 'components/molecules';
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
import { NftResponse, NftsResponse } from 'types/data';
import { isSuccess } from 'lib/utils/response';
import { getNftPrice } from 'lib/utils/nft';

export async function getServerSideProps({ req, res, query }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const fetchApi = fetcher(session);
  const { id } = query;
  const [nft, relativeNfts] = await Promise.all([
    fetchApi<NftResponse>(`/nft/${id}`),
    fetchApi<NftsResponse>(`/nft/exchange/list?_limit=4`),
  ]);

  return {
    props: {
      id,
      fallback: {
        [`/nft/${id}`]: nft,
        '/nft/exchange/list?limit=4': relativeNfts,
      },
    },
  };
}

const Index: NextPageWithLayout = ({ id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: nftResponse, error: errorNfts } = useSWR<NftResponse>(`/nft/${id}`);
  const { data: relativeNftsResponse, error: errorRelativeNfts } = useSWR<NftsResponse>(`/nft/exchange/list?limit=4`);

  if (errorNfts || !isSuccess(nftResponse.message)) {
    return <Error />;
  }

  if (!nftResponse) {
    return <DetailNftSkeleton />;
  }
  const { data: nft } = nftResponse;
  const { list: relativeNfts } = relativeNftsResponse.data;
  const nftPrice = getNftPrice(nft.orders);

  return (
    <Fragment>
      <NextSeo title={nft.name} />
      <Breadcrumb
        className="bg-neutral-10 mb-7.5 py-2.5"
        links={[
          { label: 'Collections', href: '/collections', as: '/collections' },
          {
            label: nft.collection_info.name,
            as: `/collections/${nft.collection_info.id}/${convertToSlug(nft.collection_info.name)}`,
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
          {nftPrice && <ProductExchange className="w-full" data={getNftPrice(nft.orders)} nftId={nft.id} />}
          <ProductDetails nft={nft} className="w-full" />
        </div>
        {/* End Desktop Screen*/}

        {/* Start Mobile Screen */}
        <div className="gap-y-7.5 col-span-5 flex flex-col sm:hidden">
          <ProductInfo className="col-span-5" nft={nft} />
          <ProductImage className="col-span-5" alt={nft.name} image={nft.image} />
          {nftPrice && <ProductExchange className="col-span-5" data={getNftPrice(nft.orders)} nftId={nft.id} />}
          <ProductDetails nft={nft} className="col-span-5" />
          {nft.attributes?.length > 0 && <ProductProperties className="col-span-5" properties={nft.attributes} />}
        </div>
        {/* End Mobile Screen*/}
        <ProductOfferHistory className="mt-7.5 col-span-5" />
        {false && (
          <ProductSaleHistory
            className="mt-7.5 col-span-5"
            sales={!!nft.orders ? nft.orders.map((order) => order.prices) : []}
          />
        )}
        <ProductSimilar
          loading={!relativeNftsResponse}
          isError={errorRelativeNfts || !isSuccess(relativeNftsResponse.message)}
          className="mt-7.5 col-span-5"
          products={relativeNfts}
          collection={nft.collection_info}
        />
      </div>
    </Fragment>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
