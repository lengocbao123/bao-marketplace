import Link, { LinkProps } from 'next/link';
import { FC, Fragment, HTMLAttributes } from 'react';

export interface BreadcrumbProps extends HTMLAttributes<HTMLDivElement> {
  links?: Array<
    {
      label: string;
    } & LinkProps
  >;
}

export const Breadcrumb: FC<BreadcrumbProps> = ({ className, links, ...rest }) => {
  if (!links?.length) {
    return null;
  }

  return (
    <div className={className} {...rest}>
      <ul className="text-neutral-30 container flex items-center gap-2 text-xs font-medium md:text-sm md:font-semibold">
        {links.map((link, index) => (
          <Fragment key={index}>
            <li>
              {index !== links.length - 1 ? (
                <Link className="line-clamp-1 whitespace-nowrap md:hover:underline" {...link}>
                  {link.label}
                </Link>
              ) : (
                <span className="text-neutral line-clamp-1">{link.label}</span>
              )}
            </li>

            {index !== links.length - 1 && <li className="text-neutral-30">/</li>}
          </Fragment>
        ))}
      </ul>
    </div>
  );
};
