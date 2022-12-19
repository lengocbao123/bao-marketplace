import { ImageGoerli, ImagePolygon, ImageThundercore } from 'assets/images/brand/blockchain';

export const ALLOW_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
export const DEFAULT_MAX_IMAGE_SIZE = 10_000_000; // 10_000_000Bytes ~ 10MB
export const DEFAULT_ALLOW_IMAGE_EXTENSIONS = { 'image/jpg': [], 'image/jpeg': [], 'image/png': [], 'image/gif': [] };
export const USER_INVENTORY_TABS = [
  // {
  //   id: 'nfts-on-sale',
  //   label: 'On Sale',
  //   value: 'on-sale',
  // },
  {
    id: 'nfts-created',
    label: 'Created',
    value: 'created',
  },
  {
    id: 'nfts-owned',
    label: 'Owned',
    value: 'owner',
  },
  {
    id: 'collections',
    label: 'Collections',
    value: 'collections',
  },
];
export const PIKASSO_CHAINS = [
  {
    value: 'polygon',
    label: 'Polygon',
    Icon: ImagePolygon,
  },
  {
    value: 'goerli',
    label: 'Goerli',
    Icon: ImageGoerli,
  },
  {
    value: 'thundercore',
    label: 'Thundercore',
    Icon: ImageThundercore,
  },
];
export const STATUS = [
  { label: 'Buy Now', value: 'buy-now' },
  { label: 'Live Auction', value: 'live-auction' },
];

export const DUMMY_USER_BIO =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.';

export const PIKASSO_DISCORD_URL = 'https://discord.com/invite/E83XENYZrg';
