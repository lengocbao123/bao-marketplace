import { Layout } from 'components/layouts';
import { DropdownSelect, Tabs } from 'components/molecules';
import { CollectionsList } from 'components/organisms';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { PERIODS } from 'lib/dummy';
import { NextSeo } from 'next-seo';
import { fetcher } from 'lib/utils/fetcher';
import { Collection } from '@prisma/client';
import { Avatar, Button, ButtonText, CheckboxInput } from 'components/atoms';
import { FilterIcon } from 'components/icons/outline';
import { PIKASSO_CHAINS } from 'lib/constants';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export async function getServerSideProps({ query }) {
  const collections = await fetcher<{ data: Array<Collection>; page: number; totalPages: number; totalItems: number }>(
    `/collection?${new URLSearchParams(query).toString()}`,
  );

  return {
    props: {
      collections: collections.data,
      page: collections.page,
      totalPages: collections.totalPages,
      totalItems: collections.totalItems,
    },
  };
}

const ExploreCollectionPage: NextPageWithLayout = ({
  collections,
  page,
  totalPages,
  totalItems,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { query } = router;

  const schema = z.object({
    chain: z
      .array(z.enum(['polygon', 'goerli', 'thundercore']))
      .optional()
      .default([]),
  });
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { append: appendChain, remove: removeChain } = useFieldArray({
    control: form.control,
    name: 'chain',
  });
  form.watch((data) => {
    router.push(`${router.pathname}?${new URLSearchParams(data).toString()}`);
  });

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
      <Tabs
        data={PERIODS.map((item) => ({
          label: item.title,
          value: item.value,
          active: (item.value === 'all_time' && !query.period) || item.value === query.period,
        }))}
        onChangeTab={(value) => {
          // form.setValue('category', value);
        }}
        className="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
      />
      <div className="container space-y-6">
        <div className="flex w-fit sm:w-full sm:justify-between">
          <div className="flex justify-between gap-5">
            <Button variant="tertiary" label="Filter" icon={FilterIcon} />
            <ButtonText label="Clear all" variant="secondary" className="hidden sm:block"  onClick={() => form.reset({})} />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block">Sort by</span>
            <DropdownSelect
              options={[
                {
                  value: 'recently_listed',
                  label: 'Recently Listed',
                },
              ]}
              onChange={(option) => []}
              activeIndex={0}
            />
          </div>
        </div>
        <div className="flex ">
          <div className="w-full max-w-xs space-y-6  pt-4">
            <div className="font-medium">Chain</div>
            {PIKASSO_CHAINS.map((chain) => {
              return (
                <CheckboxInput
                  key={chain.value}
                  label={<Avatar name={chain.label} src={chain.Icon} size={'sm'} />}
                  className="mb-5"
                  checked={(form.getValues('chain') || []).includes(chain.value)}
                  onChange={(event) => {
                    if (event.target.checked) {
                      appendChain(chain.value);
                    } else {
                      const index = form.getValues('chain').findIndex((value) => value === chain.value);
                      removeChain(index);
                    }
                  }}
                />
              );
            })}
          </div>
          <CollectionsList
            className="grow"
            collections={collections}
            meta={{
              total_items: totalItems,
              current_page: page,
              total_pages: totalPages,
              items_per_page: 8,
              item_count: 8,
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

ExploreCollectionPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExploreCollectionPage;
