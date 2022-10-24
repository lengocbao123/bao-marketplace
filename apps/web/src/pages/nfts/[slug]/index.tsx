import { NextSeo } from 'next-seo';
import { Fragment, ReactElement } from 'react';
import { Layout } from '../../../components/layouts';
import { Breadcrumb } from '../../../components/molecules';
import {
  ProductInfo,
  ProductImage,
  ProductExchange,
  ProductDetails,
  ProductProperties,
  ProductSaleHistory,
  ProductSimilar,
  ProductOfferHistory
} from '../../../components/organisms';
import { NFTS } from '../../../lib/dummy';
import { NextPageWithLayout } from '../../_app';

const Index: NextPageWithLayout = () => {
  const nft = NFTS[0];
  const hasOrder = nft.order || nft.order?.id != null;

  return (
    <Fragment>
      <NextSeo title="Product Details" />
      <Breadcrumb
        className="bg-neutral-10 mb-7.5 py-2.5"
        links={[
          { label: 'Collections', href: '/collections', as: '/collections' },
          {
            label: 'Monkey collection 69',
            as: '/collections/monkey-collection-69',
            href: '/collections/[slug]'
          },
          { label: nft.name, href: '/', as: '/' }
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
        <ProductSaleHistory className="mt-7.5 col-span-5" />
        <ProductSimilar className="mt-7.5 col-span-5" />
      </div>
    </Fragment>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Index;
