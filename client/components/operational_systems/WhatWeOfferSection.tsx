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
    title: "Process Optimization & Automation",
    description: "Streamline operations through intelligent process design and automation. We identify inefficiencies and implement solutions that reduce costs while improving quality and speed.",
    icon: "M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17M2 12L12 17L22 12",
    features: [
      "Business process mapping and analysis",
      "Workflow automation and digitization",
      "Lean Six Sigma implementation",
      "Performance metrics and KPI development",
      "Change management and training programs"
    ]
  },
  {
    title: "Infrastructure Design & Management",
    description: "Build robust infrastructure that scales with your growth. From IT systems to physical facilities, we design and manage infrastructure that supports operational excellence.",
    icon: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H21ZM3 10V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H3Z",
    features: [
      "IT infrastructure planning and deployment",
      "Cloud migration and hybrid solutions",
      "Network architecture and security",
      "Facility design and optimization",
      "Disaster recovery and business continuity"
    ]
  },
  {
    title: "Quality Management Systems",
    description: "Implement comprehensive quality frameworks that ensure consistency, compliance, and continuous improvement across all operational areas.",
    icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z",
    features: [
      "ISO certification preparation and maintenance",
      "Quality control and assurance protocols",
      "Document management systems",
      "Audit preparation and compliance tracking",
      "Continuous improvement programs"
    ]
  },
  {
    title: "Supply Chain & Logistics",
    description: "Optimize your supply chain for efficiency, resilience, and cost-effectiveness. We design end-to-end logistics solutions that adapt to market changes.",
    icon: "M2 12C2 6.48 6.48 2 12 2S22 6.48 22 12 17.52 22 12 22 2 17.52 2 12M15.31 8L11.75 11.56L8.69 8.5L7.28 9.91L11.75 14.38L16.72 9.41L15.31 8Z",
    features: [
      "Supply chain mapping and risk assessment",
      "Vendor management and procurement optimization",
      "Inventory management and forecasting",
      "Logistics network design",
      "Sustainability and ethical sourcing"
    ]
  },
  {
    title: "Data Analytics & Intelligence",
    description: "Transform operational data into actionable insights. We implement analytics platforms that drive informed decision-making and predictive capabilities.",
    icon: "M22 21V19H20V17H22V15H20V13H22V11H20V9H22V7H20V5H22V3H20C18.9 3 18 3.9 18 5V19C18 20.1 18.9 21 20 21H22M2 3H4V5H2V7H4V9H2V11H4V13H2V15H4V17H2V19H4V21H2C3.1 21 4 20.1 4 19V5C4 3.9 3.1 3 2 3M6 7V9H8V7H6M10 7V9H12V7H10M14 7V9H16V7H14M6 11V13H8V11H6M10 11V13H12V11H10M14 11V13H16V11H14M6 15V17H8V15H6M10 15V17H12V15H10M14 15V17H16V15H14Z",
    features: [
      "Business intelligence dashboard development",
      "Predictive analytics and forecasting",
      "Real-time monitoring and alerting",
      "Data warehouse design and implementation",
      "Machine learning and AI integration"
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