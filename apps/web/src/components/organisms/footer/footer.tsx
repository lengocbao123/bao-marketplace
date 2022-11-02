import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { DiscordIcon, MediumIcon, TwitterIcon } from 'components/icons/brand';
import { LinkIcon } from 'components/icons/outline';
import { FormSubscribe } from 'components/molecules/form';

export type FooterProps = HTMLAttributes<HTMLElement>;

export const Footer: FC<FooterProps> = (props) => {
  const year = new Date().getFullYear();

  return (
    <footer className={'bg-secondary-70 text-neutral-30 mt-20 pt-2.5 pb-6'} {...props}>
      <div className="container">
        <div className="divide-y divide-neutral-50">
          <div className="py-7.5 grid gap-4 lg:grid-cols-3">
            <div className="">
              <div className="">
                <Link href={'/'} className={'block'}>
                  <Image
                    src={'/assets/images/logo-pikasso-white.png'}
                    width={123}
                    height={30}
                    alt={'Pikasso'}
                    className={'h-7.5 aspect-[123/30] w-auto'}
                    quality={100}
                    priority
                  />
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <Image src={'/assets/images/logo-starkware.png'} width={48} height={48} alt={'Starkware'} />
                <div className="space-y-0.5">
                  <div>Received grant from</div>
                  <div className="">
                    <Image src={'/assets/images/logo-starkware-text.png'} width={163} height={24} alt={'Starkware'} />
                  </div>
                </div>
              </div>
              <div className="mt-6 text-sm">Pikasso is re-branded from Metabase</div>
            </div>

            <div className="gap-y-7.5 border-neutral-10/10 grid border-t pt-4 sm:grid-cols-2 lg:border-t-0 lg:pt-0">
              <div className="row-span-2 space-y-4">
                <h2 className={'text-neutral-0 text-sm font-bold'}>Marketplace</h2>
                <nav>
                  <ul className={'space-y-3 text-sm font-medium'}>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>All NFTs</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Art</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Photography</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Metaverses</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Music</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Sports</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Games</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* end Marketplace */}

              <div className="space-y-4">
                <h2 className={'text-neutral-0 text-sm font-bold'}>Resources</h2>
                <nav>
                  <ul className={'space-y-3 text-sm font-medium'}>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0 flex items-center gap-1'}>
                        <span>About</span>
                        <LinkIcon className={'text-xl'} />
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0 flex items-center gap-1'}>
                        <span>Support</span>
                        <LinkIcon className={'text-xl'} />
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Blog</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* end Resources */}

              <div className="space-y-4">
                <h2 className={'text-neutral-0 text-sm font-bold'}>Legal</h2>
                <nav>
                  <ul className={'space-y-3 text-sm font-medium'}>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Privacy Policy</span>
                      </Link>
                    </li>
                    <li>
                      <Link href={'/'} className={'hover:text-neutral-0'}>
                        <span>Terms & Conditions</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              {/* end Legal */}
            </div>

            <div className="border-neutral-10/10 border-t pt-4 lg:border-t-0 lg:pt-0">
              <div className="">
                <div className="space-y-4">
                  <h2 className={'text-neutral-0 text-sm font-bold'}>Social Links</h2>
                  <nav>
                    <ul className={'flex gap-3'}>
                      <li>
                        <Link
                          href={'https://discord.gg/E83XENYZrg'}
                          className={'hover:text-neutral-0'}
                          target={'_blank'}
                          rel={'nofollow'}
                        >
                          <DiscordIcon className={'text-2xl'} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={'https://twitter.com/pikassonft'}
                          className={'hover:text-neutral-0'}
                          target={'_blank'}
                          rel={'nofollow'}
                        >
                          <TwitterIcon className={'text-2xl'} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={'https://medium.com/@Pikasso.nft'}
                          className={'hover:text-neutral-0'}
                          target={'_blank'}
                          rel={'nofollow'}
                        >
                          <MediumIcon className={'text-2xl'} />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                {/* end Social Links */}
              </div>

              <div className="border-neutral-10/10 mt-4 border-t pt-4">
                <div className="space-y-4">
                  <h2 className={'text-neutral-0 text-sm font-bold'}>Join Our Newsletter</h2>
                  <FormSubscribe />
                </div>
                {/* end Partner with Us? */}
              </div>
            </div>
          </div>

          <div className="grid gap-4 py-4 text-xs font-medium sm:grid-cols-2">
            <div className="">© Copyright {year} Pikasso. All rights Reserved.</div>

            <div className="sm:justify-self-end">
              <ul className={'flex'}>
                <li>
                  <Link href={'/'} className={'hover:text-white hover:underline'}>
                    Privacy & Cookies
                  </Link>
                </li>
                <li className={'px-4'}>|</li>
                <li>
                  <Link href={'/'} className={'hover:text-white hover:underline'}>
                    Ts&Cs
                  </Link>
                </li>
                <li className={'px-4'}>|</li>
                <li>
                  <Link href={'/'} className={'hover:text-white hover:underline'}>
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
