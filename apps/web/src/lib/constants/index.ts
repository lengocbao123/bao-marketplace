import { EthereumIcon, PolygonIcon, ThundercoreIcon } from 'components/icons/blockchain';

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
    Icon: PolygonIcon,
  },
  {
    value: 'goerli',
    label: 'Goerli',
    Icon: EthereumIcon,
  },
  {
    value: 'thundercore',
    label: 'Thundercore',
    Icon: ThundercoreIcon,
  },
];
export const STATUS = [
  { label: 'Buy Now', value: 'buy-now' },
  { label: 'Live Auction', value: 'live-auction' },
];
