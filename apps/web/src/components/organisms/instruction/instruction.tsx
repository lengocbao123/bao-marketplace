import { CollectionGraphic, GalleryGraphic, SaleGraphic } from '../../icons/graphic';
import { Section } from '../../molecules';

export const Instruction = () => {
  const steps = [
    {
      title: 'Create your collection',
      image: CollectionGraphic,
      description: 'Add social links, a description, profile & banner images, and set a secondary sales fee.'
    },
    {
      title: 'Add your NFTs',
      image: GalleryGraphic,
      description:
        'Upload your work, add a title and description, and customize your NFTs with properties, stats, and unlockable content.'
    },
    {
      title: 'List them for sale',
      image: SaleGraphic,
      description:
        'Choose between auctions, fixed-price listings, and declining-price listings, and we help you sell them!'
    }
  ];
  return (
    <div className="container">
      <div className={'bg-secondary/10 px-12.5 sm:pt-15 pb-17.5 sm:pb-22.5 mb-20 rounded-[2.5rem] pt-10'}>
        <Section heading="Create and Sell Your NFTs" lead="How to be a creator" className="">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.image;

              return (
                <div key={step.title} className="flex-col items-center justify-center">
                  <Icon width="72" height="72" className="mx-auto" />

                  <p className="mt-6 text-center text-base font-bold">{step.title}</p>

                  <p className="mt-2 text-center text-sm font-medium text-neutral-50">{step.description}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
};
