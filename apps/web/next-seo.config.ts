export const title = 'Marketplace';
export const description = 'A starter template for Next.js with TypeScript and Tailwind CSS.';
export const url = 'https://marketplace.pikasso.xyz';
export const keywords = 'nft, marketplace, crypto, ethereum';

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
    site: '@pikassonft',
    cardType: 'summary_large_image'
  }
};

export default nextSeoConfig;
