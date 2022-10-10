import { useEffect, useState } from 'react';

export type UseModalOptions<T> = {
  steps?: T[];
  initialStep?: T;

  show?: boolean;
  onClose?: () => void;
};

export const useModal = <T extends string>(options?: UseModalOptions<T>) => {
  const { steps = [], initialStep, show = false, onClose } = options || {};
  const [step, setStep] = useState(initialStep || steps[0]);
  const [showModal, setShowModal] = useState(show);
  const [message, setMessage] = useState<string | null | undefined>();

  useEffect(() => {
    setShowModal(show);

    if (show) {
      setStep(initialStep || steps[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const _setStep = (step: T) => {
    // Check step is in the step array.
    if (!steps.includes(step)) {
      throw new Error('Step not found in steps array.');
    }

    setStep(step);

    if (!show) {
      setShowModal(true);
    } else {
      /*
       * HeadlessUI modal scrollbar bug cannot scroll after modal is closed.
       * Ref: https://github.com/tailwindlabs/headlessui/issues/1744
       */
      setShowModal(false);
      setTimeout(() => {
        setShowModal(true);
      }, 200);
    }
  };

  const nextStep = () => {
    const nextIndex = steps.indexOf(step) + 1;
    const nextStep = steps[nextIndex];

    setStep(nextStep);
  };

  const prevStep = () => {
    const prevIndex = steps.indexOf(step) - 1;
    const prevStep = steps[prevIndex];

    setStep(prevStep);
  };

  const goToStep = (step: T, msg?: string | null) => {
    setMessage(msg);
    _setStep(step);
  };

  const close = () => {
    setShowModal(false);
    onClose?.();

    // Reset message.
    setMessage(null);
  };

  const open = (step?: T, msg?: string | null) => {
    setMessage(msg);

    if (step) {
      _setStep(step);
    } else {
      setShowModal(true);
    }
  };

  return {
    step,
    showModal,
    message,
    nextStep,
    prevStep,
    goToStep,
    close,
    open
  };
};
