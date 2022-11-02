import { FC, Fragment, HTMLAttributes } from 'react';
import { SimpleFooter } from 'components/organisms';
import { SimpleHeader } from 'components/organisms';

export type SimpleLayoutProps = HTMLAttributes<HTMLElement>;

/**
 * Layout component
 * @param props
 * @constructor
 */
export const SimpleLayout: FC<SimpleLayoutProps> = (props) => {
  const { children, ...layoutProps } = props;

  return (
    <Fragment>
      <SimpleHeader />
      <main {...layoutProps}>{children}</main>
      <SimpleFooter />
    </Fragment>
  );
};
