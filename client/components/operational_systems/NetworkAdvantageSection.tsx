import NetworkCard from "../strategy_advisory/NetworkCard";

const networkCards = [
  {
    title: "Builders & Contractors",
    description: "For physical office setup and renovations",
    icon: "M12 2L2 7L12 12L22 7L12 2M2 17L12 22L22 17M2 12L12 17L22 12"
  },
  {
    title: "IT & Tech Specialists",
    description: "For advanced infrastructure, cybersecurity, and systems integration",
    icon: "M12 3L1 9L12 15L21 12.35V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z"
  },
  {
    title: "Furniture & Workspace Designers",
    description: "For ergonomic, functional office environments",
    icon: "M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.3 14.8 17.3H9.2C8.6 17.3 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7M12 8.2C11.2 8.2 10.5 8.7 10.5 10V11.5H13.5V10C13.5 8.7 12.8 8.2 12 8.2Z"
  },
  {
    title: "Legal & Compliance Experts",
    description: "To ensure all systems meet regulatory requirements",
    icon: "M2 12C2 6.48 6.48 2 12 2S22 6.48 22 12 17.52 22 12 22 2 17.52 2 12M15.31 8L11.75 11.56L8.69 8.5L7.28 9.91L11.75 14.38L16.72 9.41L15.31 8Z"
  }
];

export default function NetworkAdvantageSection() {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          The ORR Network Advantage
        </h2>
        <p className="text-slate-200 text-lg max-w-3xl mx-auto">
          When your needs extend beyond pure operations consulting, we activate our 
          global network of trusted specialists:
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {networkCards.slice(0, 3).map((card, index) => (
            <NetworkCard key={index} {...card} />
          ))}
        </div>
        <div className="flex justify-center">
          <NetworkCard {...networkCards[3]} />
        </div>
      </div>
    </section>
  )
}