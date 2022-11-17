import { Footer, Header } from 'components/organisms';
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
      <Header className={'bg-neutral-0 sticky top-0 z-20 border-b'} />
      <main {...layoutProps}>{children}</main>
      <Footer />
    </Fragment>
  );
};
