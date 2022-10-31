import { FC, HTMLAttributes } from 'react';
import { Header, SimpleFooter } from '../organisms';

export type ErrorLayoutProps = HTMLAttributes<HTMLElement>;

/**
 * ErrorLayout component
 * @param props
 * @constructor
 */
export const ErrorLayout: FC<ErrorLayoutProps> = (props) => {
  const { children, ...errorLayoutProps } = props;

  return (
    <div className={'flex min-h-screen flex-col'}>
      <Header />
      <main {...errorLayoutProps} className={'grid grow place-content-center'}>
        {children}
      </main>
      <SimpleFooter />
    </div>
  );
};
