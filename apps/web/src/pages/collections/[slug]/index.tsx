import { InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb, ExploreSection, generateTabLinkData } from 'components/molecules';
import { CollectionProfile } from 'components/organisms';
import { NftsFilters, NftsList } from 'components/organisms/nfts';
import { useFilter } from 'hooks/use-filters';
import { COLLECTIONS, NFTS } from 'lib/dummy';
import { NextPageWithLayout } from 'pages/_app';

const DEFAULT_FILTERS = { status: [], blockchain: [], price: [], collection: [] };

export async function getServerSideProps({ query, resolvedUrl }) {
  if (!query.filter) {
    return {
      redirect: {
        destination: `${resolvedUrl}?filter=on-sale`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Home: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { filter, onFiltersChange } = useFilter(DEFAULT_FILTERS);
  const router = useRouter();
  const { query } = router;
  const tabs = [
    {
      id: 'on-sale-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'On Sale (1k)',
      url: '?filter=on-sale',
    },
    {
      id: 'live-auction-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'Live Auction (978)',
      url: '?filter=live-auction',
    },
    {
      id: 'unlisted-18d8b4f2-4cf9-11ed-bdc3-0242ac120002',
      label: 'Unlisted (100)',
      url: '?filter=unlisted',
    },
  ];

  return (
    <Fragment>
      <NextSeo title={COLLECTIONS[0].name} />
      <Breadcrumb
        className="bg-neutral-10 mb-0 py-2.5"
        links={[
          { label: 'Collections', href: '/collections', as: '/collections' },
          { label: COLLECTIONS[0].name, href: '/', as: '/' },
        ]}
      />
      <CollectionProfile className="m-0" collection={COLLECTIONS[0]} />
      <div className="container">
        <ExploreSection
          filtersComponent={<NftsFilters collections={COLLECTIONS} filter={filter} onChange={onFiltersChange} />}
          tabs={generateTabLinkData(tabs, `/collections/${query.slug}`)}
          filter={filter}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border-b"
        >
          <NftsList
            nfts={NFTS}
            meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
          />
        </ExploreSection>
      </div>
    </Fragment>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
