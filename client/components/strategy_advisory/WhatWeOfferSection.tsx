interface OfferCardProps {
  title: string;
  description: string;
  icon: string;
  features: string[];
  className?: string;
}

function OfferCard({ title, description, icon, features, className = '' }: OfferCardProps) {
  return (
    <div className={`bg-card rounded-lg p-6 border border-slate-700 relative pt-20 ${className}`}>
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
    title: "Regulatory & Compliance Consulting",
    description: "Navigate complex regulatory landscapes with confidence. We help organizations understand, implement, and maintain compliance across multiple jurisdictions and industry standards.",
    icon: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H21ZM3 10V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H3Z",
    features: [
      "Regulatory framework assessment and gap analysis",
      "Compliance program design and implementation",
      "Policy development and documentation",
      "Audit preparation and regulatory reporting",
      "Ongoing compliance monitoring and updates"
    ]
  },
  {
    title: "Sustainability & ESG Strategy",
    description: "Build sustainable practices that meet regulatory requirements while creating a real business value. We develop ESG strategies that align with global frameworks and stakeholder expectations.",
    icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
    features: [
      "Sustainability assessment and materiality analysis",
      "ESG reporting framework implementation (GRI, SASB, TCFD)",
      "Carbon footprint measurement and reduction strategies",
      "Supply chain sustainability audits",
      "Green certification preparation and support"
    ]
  },
  {
    title: "Biotechnology & Scientific Consulting",
    description: "Leverage our network of scientific experts to navigate the technical and regulatory complexities of biotechnology and life sciences.",
    icon: "M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C9.79 7 8 8.79 8 11S9.79 15 12 15 16 13.21 16 11 14.21 7 12 7M12 9C13.1 9 14 9.9 14 11S13.1 13 12 13 10 12.1 10 11 10.9 9 12 9Z",
    features: [
      "Product development and sales regulatory pathways",
      "Scientific literature review and analysis",
      "Biosafety and biosecurity protocols",
      "Quality management system (QMS) implementation"
    ]
  },
  {
    title: "Risk Management & Due Diligence",
    description: "Identify and mitigate operational and compliance risks before they become problems. We conduct thorough due diligence for strategic decisions and partnerships.",
    icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z",
    features: [
      "Compliance risk assessment",
      "Third-party due diligence",
      "Regulatory impact assessment",
      "Crisis management and contingency planning"
    ]
  },
  {
    title: "Policy Development & Implementation",
    description: "Create robust policies that protect your organization while enabling operational efficiency. We develop clear, actionable policies that are practical and compliant.",
    icon: "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.1 4.89 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20Z",
    features: [
      "Corporate governance frameworks",
      "Data protection and privacy policies (GDPR, CCPA)",
      "Health and safety protocols",
      "Ethics and integrity programs",
      "Industry-specific compliance manuals"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-32 gap-x-12 mb-24 justify-items-center">
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