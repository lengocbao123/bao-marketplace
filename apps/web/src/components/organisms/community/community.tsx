import { Button } from '../../atoms';
import { DiscordIcon } from '../../icons/brand';
import { Section } from '../../molecules';

export const Community = () => {
  return (
    <Section heading="Create and Sell Your NFTs" className="mb-20">
      <p className="">
        Every NFTs on Metabase is authentic and truly unique. Blockchain technology makes this new approach to digital
        ownership possible. Use our platform to showcase and sell your work to collectors who care about authenticity.
      </p>
      <div className="flex items-center justify-center">
        <Button icon={DiscordIcon} label="Launch Discord" />
      </div>
    </Section>
  );
};
