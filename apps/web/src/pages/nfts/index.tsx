import { Layout } from 'components/layouts';
import { DropdownSelect, TabData, Tabs } from 'components/molecules';
import { NftsList } from 'components/organisms/nfts';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { NextPageWithLayout } from 'pages/_app';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { serverFetcher } from 'lib/utils/fetcher';
import { Category, Collection, Nft, User } from '@prisma/client';
import { Avatar, Button, ButtonText, CheckboxInput, Input } from 'components/atoms';
import { PIKASSO_CHAINS } from 'lib/constants';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FilterIcon } from 'components/icons/outline';

export async function getServerSideProps({ query }) {
  const [categories, nfts, collections] = await Promise.all([
    serverFetcher<Array<Category>>(`/category`),
    serverFetcher<{
      data: Array<Nft & { collection: Collection; user: User }>;
      page: number;
      totalPages: number;
      totalItems: number;
    }>(`/nft?${new URLSearchParams(query).toString()}`),
    serverFetcher<{ data: Array<Collection>; page: number; totalPages: number; totalItems: number }>(`/collection`),
  ]);

  return {
    props: {
      categories,
      nfts,
      collections,
    },
  };
}
const schema = z
  .object({
    chain: z
      .array(z.enum(['polygon', 'goerli', 'thundercore']))
      .optional()
      .default([]),
    collections: z.array(z.string()).optional().default([]),
    priceMin: z.number().optional().default(0),
    priceMax: z.number().optional().default(Infinity),
    category: z.string().optional(),
  })
  .refine(
    ({ priceMin, priceMax }) => {
      return priceMin < priceMax;
    },
    {
      message: 'Please enter valid prices',
      path: ['priceMin'],
    },
  );
const ExplorePage: NextPageWithLayout = ({
  categories,
  nfts,
  collections,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { append: appendChain, remove: removeChain } = useFieldArray({
    control: form.control,
    name: 'chain',
  });
  const { append: appendCollections, remove: removeCollections } = useFieldArray({
    control: form.control,
    name: 'collections',
  });
  const categoryTabs: TabData[] = [
    {
      id: '',
      name: 'All',
      code: 'all',
    },
    ...categories,
  ].map((item) => ({
    label: item.name,
    value: item.id,
    active: (!item.id && !form.getValues('category')) || item.id === form.getValues('category'),
  }));

  form.watch((data) => {
    if(data){
      router.push(`${router.pathname}?${new URLSearchParams(data).toString()}`);
    }
  });

  return (
    <Fragment>
      <Image
        src={'/assets/images/banner/banner.png'}
        width={1440}
        height={144}
        alt="Explore Banner"
        className={'bg-neutral-10 aspect-[1440/144] w-full object-cover object-center'}
      />
      <Tabs
        data={categoryTabs}
        onChangeTab={(value) => {
          form.setValue('category', value);
        }}
        className="border-neutral-10 mb-7.5 bottom-1 flex justify-start border sm:justify-center"
      />
      <div className="container space-y-6">
        <div className="flex w-fit sm:w-full sm:justify-between">
          <div className="flex justify-between gap-5">
            <Button variant="tertiary" label="Filter" icon={FilterIcon} />
            <ButtonText
              label="Clear all"
              variant="secondary"
              className="hidden sm:block"
              onClick={() => form.reset({})}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block">Sort by</span>
            <DropdownSelect
              options={[
                {
                  value: 'recently_listed',
                  label: 'Recently Listed',
                },
                {
                  value: 'price_low_to_high',
                  label: 'Price: Low to High',
                },
                {
                  value: 'price_high_to_low',
                  label: 'Price: High to Low',
                },
              ]}
              onChange={(option) => []}
              activeIndex={0}
            />
          </div>
        </div>
        <div className="flex space-x-0 sm:space-x-6 ">
          <div className="w-full max-w-xs space-y-6 divide-y">
            <div className="space-y-4 pt-4">
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
            <div className="space-y-4 pt-4">
              <div className="font-medium">Price</div>
              <div className="flex items-center justify-between">
                <Input className="w-full" placeholder="Min" {...form.register('priceMin')} />
                <span className="mx-3 text-sm text-neutral-50">to</span>
                <Input className="w-full" placeholder="Max" {...form.register('priceMax')} />
              </div>
            </div>
            <div className="space-y-4 pt-4">
              <div className="font-medium">Collection</div>
              {collections &&
                collections.data.map((collection) => (
                  <CheckboxInput
                    key={collection.id}
                    label={collection.name}
                    className="mb-5"
                    checked={(form.getValues('collections') || []).includes(collection.id)}
                    onChange={(event) => {
                      if (event.target.checked) {
                        appendCollections(collection.id);
                      } else {
                        const index = form.getValues('collections').findIndex((value) => value === collection.id);
                        removeCollections(index);
                      }
                    }}
                  />
                ))}
            </div>
          </div>
          <NftsList
            className="grow"
            nfts={nfts.data}
            meta={{
              total_items: nfts.totalItems,
              current_page: nfts.page,
              total_pages: nfts.totalPages,
              items_per_page: 8,
              item_count: 8,
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

ExplorePage.getLayout = (page) => <Layout>{page}</Layout>;

export default ExplorePage;
