import { Button, ButtonIcon } from 'components/atoms';
import { ChevronLeftIcon, ChevronRightIcon } from 'components/icons/outline';
import { FC, MouseEvent, useMemo, useRef, useState, WheelEvent } from 'react';

export type ChipOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export interface ChipFilterProps {
  options: ChipOption[];
  value?: string;
  onChange: (value: string) => void;
}

export const ChipFilter: FC<ChipFilterProps> = ({ options = [], value, onChange }) => {
  const [selected, setSelected] = useState(value);

  const filterRef = useRef<HTMLDivElement>();
  const mousedownRef = useRef<boolean>(false);
  const [translateX, setTranslateX] = useState<number>(0);

  const getTranslateXByItem = (): number => {
    if (!filterRef.current) {
      return 0;
    }

    const filterItemCount = options?.length;

    if (!filterItemCount) {
      return 0;
    }

    const { scrollWidth } = filterRef.current;

    return scrollWidth / filterItemCount;
  };

  const translateTo = (offsetX: number) => {
    if (!filterRef.current) {
      return;
    }

    const { scrollWidth, clientWidth } = filterRef.current;

    setTranslateX((prevState) => {
      if (prevState + offsetX > 0) {
        return 0;
      }

      if (scrollWidth - clientWidth < (prevState + offsetX) * -1) {
        return (scrollWidth - clientWidth) * -1;
      }

      return prevState + offsetX;
    });
  };

  const handlePrevious = () => {
    const offsetItem = getTranslateXByItem();
    translateTo(offsetItem);
  };

  const handleNext = () => {
    const offsetItem = getTranslateXByItem();
    translateTo(offsetItem * -1);
  };

  const handleMouseDown = () => {
    mousedownRef.current = true;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!mousedownRef.current) {
      return;
    }

    const { movementX } = event;
    translateTo(movementX);
  };

  const handleMouseUp = () => {
    mousedownRef.current = false;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    const { deltaY } = event;
    translateTo(deltaY * -1);
  };

  const availablePrev = useMemo(() => {
    return translateX < 0;
  }, [translateX]);

  const availableNext = useMemo(() => {
    if (!filterRef.current) {
      return true;
    }

    const { scrollWidth, clientWidth } = filterRef.current;

    return Math.abs(translateX) < scrollWidth - clientWidth;
  }, [translateX]);

  return (
    <div className="flex items-center gap-3">
      <ButtonIcon
        disabled={!availablePrev}
        icon={ChevronLeftIcon}
        variant={'tertiary'}
        size={'sm'}
        className={'flex-none'}
        onClick={handlePrevious}
      />

      <div
        className={'scrollbar-hide grow overflow-y-hidden overflow-x-scroll text-center'}
        ref={filterRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel}
      >
        <div className="inline-flex">
          <div
            className="flex items-center justify-center gap-3 transition-transform duration-150 ease-[cubic-bezier(0.05,0,0,1)] will-change-transform"
            style={{ transform: `translateX(${translateX}px)` }}
          >
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => {
                  setSelected(option.value);
                  onChange(option.value);
                }}
                label={option.label}
                variant={selected === option.value ? 'primary' : 'tertiary'}
                disabled={option.disabled}
                size={'sm'}
              />
            ))}
          </div>
        </div>
      </div>

      <ButtonIcon
        icon={ChevronRightIcon}
        variant={'tertiary'}
        size={'sm'}
        className={'flex-none'}
        disabled={!availableNext}
        onClick={handleNext}
      />
    </div>
  );
};
