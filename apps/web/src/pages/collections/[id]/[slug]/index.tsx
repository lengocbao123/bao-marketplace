import { InferGetServerSidePropsType } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Layout } from 'components/layouts';
import { Breadcrumb, DropdownSelect } from 'components/molecules';
import { CollectionProfile } from 'components/organisms';
import { NftsList } from 'components/organisms/nfts';
import { NextPageWithLayout } from 'pages/_app';
import { Collection, Nft, User } from '@prisma/client';
import { fetcher } from 'lib/utils/fetcher';
import { Avatar, Button, ButtonText, CheckboxInput, Input } from 'components/atoms';
import { FilterIcon } from 'components/icons/outline';
import { PIKASSO_CHAINS } from 'lib/constants';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { convertToSlug } from 'lib/utils/string';

export async function getServerSideProps({ query }) {
  const { id } = query;
  const [collection, nftsByCollection] = await Promise.all([
    fetcher<{ data: Collection & { user: User } }>(`/collection/${id}`),
    fetcher<{
      data: Array<Nft & { collection: Collection; user: User }>;
      page: number;
      totalPages: number;
      totalItems: number;
    }>(`/nft?${new URLSearchParams(query).toString()}`),
  ]);

  return {
    props: {
      id,
      collection: collection.data,
      nfts: nftsByCollection,
    },
  };
}
const schema = z
  .object({
    chain: z
      .array(z.enum(['polygon', 'goerli', 'thundercore']))
      .optional()
      .default([]),
    priceMin: z.number().optional().default(0),
    priceMax: z.number().optional().default(Infinity),
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
const Home: NextPageWithLayout = ({ collection, nfts }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const { append: appendChain, remove: removeChain } = useFieldArray({
    control: form.control,
    name: 'chain',
  });
  form.watch((data) => {
    router.push({
      pathname: router.pathname,
      query: {
        id: collection.id,
        slug: convertToSlug(collection.name),
        ...data,
      },
    });
  });

  return (
    <Fragment>
      <NextSeo title={collection.name} />
      <Breadcrumb
        className="bg-neutral-10 mb-0 py-2.5"
        links={[
          { label: 'Collections', href: '/collections', as: '/collections' },
          { label: collection.name, href: '/', as: '/' },
        ]}
      />
      <CollectionProfile collection={collection} />
      <div className="container space-y-6">
        <div className="flex w-fit sm:w-full sm:justify-between">
          <div className="flex justify-between gap-5 py-4">
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
              {/* {form.formState.errors && (
                <div className="text-accent-error mt-2 text-sm">{form.formState.errors.priceMin}</div>
              )} */}
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

Home.getLayout = (page) => <Layout>{page}</Layout>;

export default Home;
