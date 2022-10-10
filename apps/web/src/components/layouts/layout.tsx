import { FC, Fragment, HTMLAttributes } from 'react';

export type LayoutProps = HTMLAttributes<HTMLElement>;

/**
 * Layout component
 * @param props
 * @constructor
 */
export const Layout: FC<LayoutProps> = (props) => {
  const { children, ...layoutProps } = props;

  return (
    <Fragment>
      <main {...layoutProps}>{children}</main>
    </Fragment>
  );
};
