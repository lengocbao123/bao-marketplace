import { FC, Fragment, HTMLAttributes } from 'react';

export type ErrorLayoutProps = HTMLAttributes<HTMLElement>;

/**
 * ErrorLayout component
 * @param props
 * @constructor
 */
export const ErrorLayout: FC<ErrorLayoutProps> = (props) => {
  const { children, ...errorLayoutProps } = props;

  return (
    <Fragment>
      <main {...errorLayoutProps}>{children}</main>
    </Fragment>
  );
};
