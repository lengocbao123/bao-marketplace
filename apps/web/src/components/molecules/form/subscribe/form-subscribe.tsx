import { FC, HTMLAttributes } from 'react';
import { Input } from '../../../atoms';

export type SubscribeProps = HTMLAttributes<HTMLElement>;

export const FormSubscribe: FC<SubscribeProps> = () => {
  return (
    <form className={'space-y-4'}>
      <Input
        type="email"
        placeholder={'Email'}
        block
        className={
          'border-secondary-40 [&_[data-component="input"]]:placeholder:text-neutral-30 focus-within:text-neutral [&_[data-component="input"]]:focus-within:placeholder:text-neutral-50'
        }
      />

      <div className="">
        <button
          type={'submit'}
          className={
            'bg-primary hover:bg-primary-50 active:bg-primary-30 text-neutral rounded-full px-8 py-2.5 text-sm font-semibold'
          }
        >
          Subscribe
        </button>
      </div>
    </form>
  );
};
