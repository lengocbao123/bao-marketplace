export const ALLOW_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
export const DEFAULT_MAX_IMAGE_SIZE = 10_000_000; // 10_000_000Bytes ~ 10MB
export const DEFAULT_ALLOW_IMAGE_EXTENSIONS = { 'image/jpg': [], 'image/jpeg': [], 'image/png': [], 'image/gif': [] };
export const USER_INVENTORY_TABS = [
  {
    id: 'nfts-on-sale',
    label: 'On Sale',
    url: 'nfts?filter=on-sale',
  },
  {
    id: 'nfts-created',
    label: 'Created',
    url: 'nfts?filter=created',
  },
  {
    id: 'nfts-owned',
    label: 'Owned',
    url: 'nfts?filter=owned',
  },
  {
    id: 'collections',
    label: 'Collections',
    url: 'collections',
  },
];
