import { CollectionGraphic, GalleryGraphic, SaleGraphic } from 'components/icons/graphic';
import { Section } from 'components/molecules';

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
      <div className={'bg-secondary/10 rounded-[2.5rem] py-10'}>
        <Section heading="Create and Sell Your NFTs" lead="How to be a creator">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.image;

              return (
                <div key={step.title} className="py-7.5 flex-col items-center justify-center text-center sm:px-5">
                  <Icon width="72" height="72" className="sm:w-18 sm:h-18 mx-auto h-16 w-16" />

                  <p className="mt-5 text-sm font-bold sm:text-base">{step.title}</p>

                  <p className="mt-2 text-sm font-medium text-neutral-50">{step.description}</p>
                </div>
              );
            })}
          </div>
        </Section>
      </div>
    </div>
  );
};
