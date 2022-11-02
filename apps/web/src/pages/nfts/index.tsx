import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { Fragment } from 'react';
import { Layout } from '../../components/layouts';
import { ExploreSection } from '../../components/molecules';
import { NftsFilters, NftsList } from '../../components/organisms/nfts';
import { useFilter } from '../../hooks/use-filters';
import { CATEGORIES, COLLECTIONS, NFTS } from '../../lib/dummy';
import { NextPageWithLayout } from '../_app';

const DEFAULT_FILTERS = { status: [], blockchain: [], price: [], collection: [] };

export async function getServerSideProps({ query, resolvedUrl }) {
  if (!query.category) {
    return {
      redirect: {
        destination: resolvedUrl + '?category=' + CATEGORIES.nfts[0].value,
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}

const ExplorePage: NextPageWithLayout = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
        filtersComponent={<NftsFilters collections={COLLECTIONS} filter={filter} onChange={onFiltersChange} />}
        tabs={CATEGORIES.nfts.map((item) => ({ ...item, url: '?category=' + item.value }))}
        tabsClassName="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
        bodyClassName="container"
        filter={filter}
      >
        <NftsList nfts={NFTS} meta={{ totalItems: 8, itemCount: 8, itemsPerPage: 10, totalPages: 1, currentPage: 1 }} />
      </ExploreSection>
    </Fragment>
  );
};

ExplorePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExplorePage;
