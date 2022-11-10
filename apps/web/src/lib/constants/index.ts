export const ALLOW_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
export const DEFAULT_MAX_IMAGE_SIZE = 10_000_000; // 10_000_000Bytes ~ 10MB
export const DEFAULT_ALLOW_IMAGE_EXTENSIONS = { 'image/jpg': [], 'image/jpeg': [], 'image/png': [], 'image/gif': [] };
export const USER_INVENTORY_TABS = [
  {
    id: 'nfts-on-sale',
    label: 'On Sale',
    value: 'on-sale',
  },
  {
    id: 'nfts-created',
    label: 'Created',
    value: 'created',
  },
  {
    id: 'nfts-owned',
    label: 'Owned',
    value: 'owned',
  },
  {
    id: 'collections',
    label: 'Collections',
    value: 'collections',
  },
];
