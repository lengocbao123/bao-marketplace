import { FC, HTMLAttributes } from 'react';

export type FooterProps = HTMLAttributes<HTMLElement>;

export const Footer: FC<FooterProps> = (props) => {
  const { children, ...footerProps } = props;

  return <div {...footerProps}>{children}</div>;
};
