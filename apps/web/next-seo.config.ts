const title = 'Marketplace';
const description = 'A starter template for Next.js with TypeScript and Tailwind CSS.';
const url = 'https://marketplace.pikasso.xyz';

/** @type {import('next-seo').DefaultSeoProps} */
const nextSeoConfig = {
  title,
  titleTemplate: '%s | Pikasso',
  description,
  canonical: url,
  openGraph: {
    url,
    type: 'website',
    title,
    description,
    locale: 'en_US'
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image'
  }
};

export default nextSeoConfig;
