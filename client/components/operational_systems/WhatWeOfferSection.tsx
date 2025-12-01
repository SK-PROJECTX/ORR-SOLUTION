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
    title: "Standard Operating Procedures (SOPs)",
    description: "Clear, documented processes that ensure consistency and quality across your organization. We create SOPs that are practical, easy to follow, and built to scale.",
    icon: "M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17M2 12L12 17L22 12",
    features: [
      "Process mapping and documentation",
      "Workflow standardization across departments",
      "Version control and continuous improvement frameworks"
    ]
  },
  {
    title: "Onboarding & Training Systems",
    description: "Get new team members productive faster with structured onboarding systems. We design systems that reduce learning time, improve retention, and create consistency in how your team operates.",
    icon: "M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6C15 7.1 14.1 8 13 8H11C9.9 8 9 7.1 9 6V4L3 7V9H21ZM3 10V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10H3Z",
    features: [
      "Employee onboarding checklists and timelines",
      "Role-specific training modules",
      "Knowledge bases and internal documentation hubs"
    ]
  },
  {
    title: "Internal Communication Workflows",
    description: "Leverage our network of scientific experts to navigate the technical and regulatory complexities of biotechnology and life sciences.",
    icon: "M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C9.79 7 8 8.79 8 11S9.79 15 12 15 16 13.21 16 11 14.21 7 12 7M12 9C13.1 9 14 9.9 14 11S13.1 13 12 13 10 12.1 10 11 10.9 9 12 9Z",
    features: [
      "Communication protocol design",
      "Meeting structures and cadences",
      "Project management system implementation"
    ]
  },
  {
    title: "Office & Tech Stack Setup",
    description: "Setting up a new office or upgrading your technology? We coordinate everything from physical space design to digital infrastructure — ensuring all systems integrate seamlessly from day one.",
    icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z",
    features: [
      "Office layout and workspace optimization",
      "Technology stack selection and implementation",
      "Hardware procurement and setup coordination",
      "Network infrastructure and security systems"
    ]
  },
  {
    title: "Workflow Design & Optimization",
    description: "Every business has bottlenecks. We identify them, redesign your workflows, and implement solutions that eliminate friction and improve efficiency.",
    icon: "M14 2H6C4.89 2 4 2.9 4 4V20C4 21.1 4.89 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2M18 20H6V4H13V9H18V20Z",
    features: [
      "Process audit and bottleneck analysis",
      "Workflow automation opportunities",
      "System integration and data flow optimization"
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
              className="max-w-md"
            />
          ))}
        </div>
      </div>
    </section>
  )
}