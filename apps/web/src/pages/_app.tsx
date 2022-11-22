import ProgressBar from '@badrap/bar-of-progress';
import { GTM_ID, pageView } from 'lib/gtm';
import { fetcher } from 'lib/utils/fetcher';
import { NextPage } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { DefaultSeo } from 'next-seo';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import Script from 'next/script';
import { Fragment, ReactElement, ReactNode, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import { SWRConfig } from 'swr';
import nextSeoConfig from '../../next-seo.config';

const progress = new ProgressBar({
  size: 2,
  color: '#6e43d4',
  className: 'bar-of-progress',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

// this fixes safari jumping to the bottom of the page
// when closing the search modal using the `esc` key
if (typeof window !== 'undefined') {
  progress.start();
  progress.finish();
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout<P = {}, IP = P> = AppProps<P> & {
  Component: NextPageWithLayout<P, IP>;
};

type PageProps = {
  session?: Session;
  fallback: any;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout<PageProps>) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', pageView);

    return () => {
      router.events.off('routeChangeComplete', pageView);
    };
  }, [router.events]);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer', '${GTM_ID}');`,
        }}
      />

      <SWRConfig
        value={{ fetcher: fetcher(pageProps.session), fallback: pageProps.fallback || {}, revalidateOnFocus: true }}
      >
        <SessionProvider session={pageProps.session}>
          <DefaultSeo {...nextSeoConfig} />

          {getLayout(<Component {...pageProps} />)}

          <Toaster />
        </SessionProvider>
      </SWRConfig>
    </Fragment>
  );
}
