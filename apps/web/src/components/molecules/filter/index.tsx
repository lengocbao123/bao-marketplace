import dynamic from 'next/dynamic';
export * from './checkbox-filter';
export * from './range-filter';

export const ChipFilter = dynamic(() => import('./chip-filter').then((component) => component.ChipFilter), {
  ssr: false
});
