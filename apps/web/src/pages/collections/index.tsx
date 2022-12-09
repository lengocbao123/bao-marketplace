import { Layout } from 'components/layouts';
import { Error, ExploreSection } from 'components/molecules';
import { CollectionsFilters, CollectionsList } from 'components/organisms';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import { PERIODS } from 'lib/dummy';
import { NextSeo } from 'next-seo';
import { useCollections } from 'hooks/services';
import { getCollections } from 'services';
import { useFilter } from 'hooks/use-filter';

export async function getServerSideProps({ req, res, query, resolvedUrl }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  const collectionQueryString = new URLSearchParams({
    ...query,
    page: query.page ? query.page : 1,
  }).toString();

  if (!query.page) {
    return {
      redirect: {
        destination: `${resolvedUrl}?${collectionQueryString}`,
        permanent: false,
      },
    };
  }
  const collections = await getCollections(session, collectionQueryString);

  return {
    props: {
      collectionQueryString,
      fallback: {
        [`/collection/exchange/list?${collectionQueryString}`]: collections,
      },
    },
  };
}

const ExploreCollectionPage: NextPageWithLayout = ({
  collectionQueryString,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { collections, error: errorCollections } = useCollections(collectionQueryString);
  const router = useRouter();
  const { query } = router;
  const { resetFilter, handleChange, convertedQuery } = useFilter(query);

  if (errorCollections) {
    return <Error />;
  }

  return (
    <Fragment>
      <NextSeo title={'Discover NFTS'} />
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt="Explore Banner"
        className={'bg-neutral-10 aspect-[1440/144] w-full object-cover object-center'}
      />
      {errorCollections ? (
        <Error className={'py-10'} />
      ) : (
        <ExploreSection
          name={'collections'}
          filtersComponent={<CollectionsFilters filter={convertedQuery} onChange={handleChange} />}
          filter={convertedQuery}
          tabs={PERIODS.map((item) => ({
            label: item.title,
            value: item.value,
            active: (item.value === 'all_time' && !query.period) || item.value === query.period,
          }))}
          tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
          bodyClassName="container"
          onChangeFilter={handleChange}
          onResetFilter={resetFilter}
        >
          <CollectionsList collections={collections.list} meta={collections.meta} />
        </ExploreSection>
      )}
    </Fragment>
  );
};

ExploreCollectionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExploreCollectionPage;
