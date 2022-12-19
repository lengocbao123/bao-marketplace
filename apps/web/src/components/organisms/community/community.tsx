import { ButtonLink } from 'components/atoms';
import { DiscordIcon } from 'components/icons/brand';
import { Section } from 'components/molecules';
import { PIKASSO_DISCORD_URL } from 'lib/constants';

export const Community = () => {
  return (
    <div className="sm:pt-12.5 bg-[url(/assets/images/background/community-background.png)] bg-contain bg-center bg-no-repeat py-10 sm:pb-3.5">
      <Section heading="Join Our Community">
        <div className="space-y-7.5">
          <div className="mx-auto max-w-4xl">
            <p className="text-neutral-70 text-center text-sm">
              Every NFTs on Metabase is authentic and truly unique. Blockchain technology makes this new approach to
              digital ownership possible. Use our platform to showcase and sell your work to collectors who care about
              authenticity.
            </p>
          </div>

          <div className="mx-auto sm:max-w-xs">
            <ButtonLink icon={DiscordIcon} label="Launch Discord" href={PIKASSO_DISCORD_URL} target={'_blank'} block />
          </div>
        </div>
      </Section>
    </div>
  );
};
