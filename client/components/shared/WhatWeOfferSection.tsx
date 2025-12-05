interface OfferCard {
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

interface WhatWeOfferSectionProps {
  offers: OfferCard[];
  layout?: 'grid' | 'flex';
}

function OfferCard({ title, description, icon, features }: OfferCard) {
  return (
    <div className="bg-card dark:bg-transparent rounded-lg p-6 dark:border dark:border-primary relative pt-20 flex-1 min-w-0 basis-full md:basis-[calc(50%-1.5rem)] xl:basis-[calc(33.333%-2rem)] max-w-md">
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-32 h-24 bg-card dark:bg-black flex items-center justify-center shadow-2xl border border-slate-600 dark:border-[#0ec277]" style={{clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 20% 100%)'}}>
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d={icon}/>
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-300 text-sm mb-4">{description}</p>
      {features && (
        <ul className="text-slate-300 text-sm space-y-1">
          {features.map((feature, index) => (
            <li key={index}>• {feature}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function WhatWeOfferSection({ offers, layout = 'flex' }: WhatWeOfferSectionProps) {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <h2 className="text-4xl font-bold text-white text-center mb-16">
        What <span className="text-[#47ff4c]">We Offer</span>
      </h2>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-32 mb-24">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </div>
    </section>
  )
}