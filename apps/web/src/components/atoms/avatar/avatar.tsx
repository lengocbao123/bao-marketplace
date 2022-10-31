import clsx from 'clsx';
import Image from 'next/image';
import { FC, HTMLAttributes } from 'react';

export type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Size for image
 */
const sizes: Record<Size, number> = {
  sm: 24,
  md: 40,
  lg: 60,
  xl: 100,
  '2xl': 160
} as const;

/**
 * The class name for the avatar has only the name prop
 */
const onlyNameSizeClasses: Record<Size, string> = {
  sm: 'text-xs w-6 h-6',
  md: 'text-base w-10 h-10',
  lg: 'text-2xl w-15 h-15',
  xl: 'text-3xl w-25 h-25',
  '2xl': 'text-4xl w-40 h-40'
} as const;

/**
 * Get short name from full name
 * @param alt
 */
const getShortName = (alt: string) => {
  const words = alt.split(' ');

  if (words.length > 1) {
    return words.map((word) => word[0]).join('');
  }

  return alt[0];
};

/* ---------------------------------------------------------------------------------------------------------------------
 * Avatar
 * ------------------------------------------------------------------------------------------------------------------ */

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  src?: string;
  size?: Size;
  onlyAvatar?: boolean;
  label?: string;
};

export const Avatar: FC<AvatarProps> = (props) => {
  const { src, name, size = 'md', onlyAvatar = false, label, ...avatarProps } = props;

  return (
    <div {...avatarProps}>
      {label && <span data-component={'label'}>{label}</span>}

      <div className="inline-flex items-center gap-2">
        {src ? (
          <Image
            src={src}
            alt={name}
            className={'bg-neutral-10 inline-block aspect-square rounded-full object-cover object-center'}
            width={sizes[size]}
            height={sizes[size]}
            data-component={'image'}
          />
        ) : (
          <span
            className={clsx(
              'bg-primary inline-flex aspect-square items-center justify-center rounded-full font-medium uppercase',
              onlyNameSizeClasses[size]
            )}
            data-component={'placeholder'}
          >
            {getShortName(name)}
          </span>
        )}

        {!onlyAvatar && <span data-component={'name'}>{name}</span>}
      </div>
    </div>
  );
};
