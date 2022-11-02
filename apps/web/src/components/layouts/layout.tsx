import { FC, Fragment, HTMLAttributes } from 'react';
import { Footer, Header } from 'components/organisms';

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
      <Header />
      <main {...layoutProps}>{children}</main>
      <Footer />
    </Fragment>
  );
};
