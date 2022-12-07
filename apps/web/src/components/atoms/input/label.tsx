import clsx from 'clsx';
import { FC, SVGProps } from 'react';

export interface InputLabelProps {
  text: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  iconOrientation?: 'left' | 'right';
}

export const InputLabel: FC<InputLabelProps> = ({ text, icon, iconOrientation = 'left' }) => {
  const Icon = icon;

  return (
    <div className={clsx('flex items-center', { 'flex-row-reverse': iconOrientation === 'right' })}>
      {Icon && <Icon className={clsx(iconOrientation === 'left' ? 'mr-1' : 'ml-1')} />} {text}
    </div>
  );
};
