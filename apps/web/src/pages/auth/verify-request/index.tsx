import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCountdown } from 'usehooks-ts';
import { Button, Input } from '../../../components/atoms';
import { CheckMailGraphic } from '../../../components/icons/graphic';
import { SimpleLayout } from '../../../components/layouts';
import { useFormVerifyRequest } from '../../../lib/hooks/form/use-form-verify-request';
import { NextPageWithLayout } from '../../_app';

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const { email } = router.query as { email: string };
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({ countStart: 60 });
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);
  const [isResending, setIsResending] = useState(true);
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    onSubmit,
    onResend
  } = useFormVerifyRequest({
    onResendSuccess: () => {
      startCountdown();
      setIsCountdownRunning(true);
      setIsResending(false);
      toast.success('We have resent your verification email.');
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const handleResend = async () => {
    resetCountdown();
    setIsResending(true);
    setIsCountdownRunning(true);
    await onResend(email);
  };

  useEffect(() => {
    startCountdown();
    setIsCountdownRunning(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (count < 1) {
      stopCountdown();
      setIsCountdownRunning(false);
      setIsResending(false);
    }
  }, [count, stopCountdown]);

  return (
    <Fragment>
      <NextSeo title="Verification Code" />

      <div className="mx-auto my-auto grid max-w-md place-items-center text-center">
        <CheckMailGraphic width={420} height={210} className="h-auto w-full" />

        <h2 className="mt-4 text-2xl font-bold md:mt-5 md:text-3xl">Verification Code</h2>

        <p className="mt-3 text-sm md:mt-4 md:text-base">
          We sent a 6-character code to {email ? <strong>{email}</strong> : 'your email'}. To continue, please enter a
          verification code we’ve just sent to your email.
        </p>

        <form className="mt-7.5 grid w-full md:mt-5" onSubmit={onSubmit}>
          <Input
            placeholder="123456"
            className={'[&_[data-component="input"]]:text-center'}
            maxLength={6}
            error={errors.otp?.message}
            {...register('otp')}
          />

          <p className="mt-4.5 text-sm">
            Don’t get a code?{' '}
            <button
              type="button"
              className="text-secondary disabled:text-secondary/50 font-bold"
              disabled={isCountdownRunning || isResending}
              onClick={handleResend}
            >
              {isCountdownRunning ? `Resend after ${count}s` : 'Resend'}
            </button>
          </p>

          <Button className="mt-8 md:mt-10" type="submit" disabled={!isValid} loading={isSubmitting} label="Verify" />
        </form>
      </div>
    </Fragment>
  );
};

Index.getLayout = (page) => <SimpleLayout>{page}</SimpleLayout>;

export default Index;
