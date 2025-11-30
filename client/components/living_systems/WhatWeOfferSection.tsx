interface OfferCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  className?: string;
}

function OfferCard({ title, description, icon, features, className = '' }: OfferCardProps) {
  return (
    <div className={`bg-card rounded-lg p-6 border border-slate-700 relative pt-20 flex-1 min-w-0 basis-full md:basis-[calc(50%-1.5rem)] xl:basis-[calc(33.333%-2rem)] max-w-md ${className}`}>
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-card flex items-center justify-center shadow-2xl" style={{clipPath: 'polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)'}}>
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d={icon}/>
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-slate-300 text-sm mb-4">{description}</p>
      <ul className="text-slate-300 text-sm space-y-1">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}

const offers = [
  {
    title: "Regenerative Agriculture & Food Systems",
    description: "Transform agricultural practices to restore soil health, enhance biodiversity, and create resilient food systems that sequester carbon while improving yields.",
    icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z",
    features: [
      "Soil health assessment and regeneration planning",
      "Carbon sequestration measurement and verification",
      "Biodiversity enhancement strategies",
      "Sustainable farming practice implementation",
      "Regenerative certification and market access"
    ]
  },
  {
    title: "Circular Economy Design",
    description: "Design business models and systems that eliminate waste, keep materials in use, and regenerate natural systems through circular principles.",
    icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
    features: [
      "Circular business model development",
      "Waste stream analysis and valorization",
      "Material flow optimization",
      "Product lifecycle extension strategies",
      "Circular supply chain design"
    ]
  },
  {
    title: "Ecosystem Restoration & Conservation",
    description: "Restore degraded ecosystems and implement conservation strategies that enhance biodiversity while creating economic opportunities.",
    icon: "M6.05 8.05C6.05 6.05 7.86 4.05 10.92 4.05S15.8 6.05 15.95 8.05C16.05 8.05 16.05 8.05 16.05 8.05C18.05 8.05 19.95 9.76 19.95 12.05S18.05 16.05 16.05 16.05H6.05C3.76 16.05 2.05 14.05 2.05 12.05S3.76 8.05 6.05 8.05M14.95 11.05L11.95 8.05L8.95 11.05H11.05V14.05H12.95V11.05H14.95Z",
    features: [
      "Ecosystem health assessment and monitoring",
      "Habitat restoration planning and implementation",
      "Species conservation strategies",
      "Natural capital valuation",
      "Community-based conservation programs"
    ]
  },
  {
    title: "Renewable Energy & Clean Technology",
    description: "Implement renewable energy solutions and clean technologies that reduce environmental impact while creating energy independence.",
    icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
    features: [
      "Renewable energy system design and implementation",
      "Energy efficiency audits and optimization",
      "Clean technology integration",
      "Grid independence and storage solutions",
      "Green energy financing and incentives"
    ]
  },
  {
    title: "Sustainable Supply Chain & Sourcing",
    description: "Build supply chains that prioritize regenerative practices, ethical sourcing, and positive environmental impact throughout the value chain.",
    icon: "M2 12C2 6.48 6.48 2 12 2S22 6.48 22 12 17.52 22 12 22 2 17.52 2 12M15.31 8L11.75 11.56L8.69 8.5L7.28 9.91L11.75 14.38L16.72 9.41L15.31 8Z",
    features: [
      "Sustainable sourcing strategy development",
      "Supply chain impact assessment",
      "Regenerative supplier network building",
      "Traceability and transparency systems",
      "Ethical sourcing certification"
    ]
  }
];

export default function WhatWeOfferSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <h2 className="text-4xl font-bold text-white text-center mb-16">
        What <span className="text-[#47ff4c]">We Offer</span>
      </h2>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-32 mb-24">
          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              {...offer}
              className={index < 3 ? 'max-w-4xl' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}