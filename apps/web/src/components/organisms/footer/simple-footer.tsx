import { FC, HTMLAttributes } from 'react';

export type FooterSimpleProps = HTMLAttributes<HTMLElement>;

export const SimpleFooter: FC<FooterSimpleProps> = (props) => {
  const year = new Date().getFullYear();

  return (
    <footer className={'text-neutral-30 mt-20 pt-2.5 pb-6 text-center'} {...props}>
      Copyright © {year} Pikasso. All rights reserved.
    </footer>
  );
};
