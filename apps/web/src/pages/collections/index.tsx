import { Layout } from 'components/layouts';
import { ExploreSection } from 'components/molecules';
import { CollectionsFilters, CollectionsList } from 'components/organisms';
import { useFilter } from 'hooks/use-filters';
import { CATEGORIES, COLLECTIONS } from 'lib/dummy';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';

const DEFAULT_FILTERS = { blockchain: [], price: [] };

export async function getServerSideProps({ query, resolvedUrl }) {
  if (!query.category) {
    return {
      redirect: {
        destination: `${resolvedUrl}?category=${CATEGORIES.collections[0].value}`,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

const ExploreCollectionPage: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { filter, onFiltersChange } = useFilter(DEFAULT_FILTERS);

  return (
    <Fragment>
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt="Explore Banner"
        className={'bg-neutral-10 aspect-[1440/144] w-full object-cover object-center'}
      />
      <ExploreSection
        filtersComponent={<CollectionsFilters filter={filter} onChange={onFiltersChange} />}
        filter={filter}
        tabs={CATEGORIES.collections.map((item) => ({ ...item, url: `?category=${item.value}` }))}
        tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
        bodyClassName="container"
      >
        <CollectionsList
          collections={COLLECTIONS}
          meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }}
        />
      </ExploreSection>
    </Fragment>
  );
};

ExploreCollectionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExploreCollectionPage;
