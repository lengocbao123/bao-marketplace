/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
  },
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    googleTagManagerId: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    apiBaseUrl: process.env.OPENAPI_BASE_URL,
  },
  serverRuntimeConfig: {
    encryptionSecret: process.env.ENCRYPTION_SECRET,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },
};

module.exports = nextConfig;
