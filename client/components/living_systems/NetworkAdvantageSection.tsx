import NetworkCard from "../strategy_advisory/NetworkCard";

const networkCards = [
  {
    title: "Ecological Scientists",
    description: "Ecosystem ecologists and biodiversity conservation specialists",
    icon: "M6.05 8.05C6.05 6.05 7.86 4.05 10.92 4.05S15.8 6.05 15.95 8.05C16.05 8.05 16.05 8.05 16.05 8.05C18.05 8.05 19.95 9.76 19.95 12.05S18.05 16.05 16.05 16.05H6.05C3.76 16.05 2.05 14.05 2.05 12.05S3.76 8.05 6.05 8.05M14.95 11.05L11.95 8.05L8.95 11.05H11.05V14.05H12.95V11.05H14.95Z"
  },
  {
    title: "Regenerative Agriculture Experts",
    description: "Soil scientists and sustainable farming practitioners",
    icon: "M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7.5 13.5 12.5 13.5 15.5 13.5C15.5 13.5 16 13.75 16 14.25C16 14.75 15.5 15 15.5 15C12.5 15 7.5 15 3.75 18.75C3.75 18.75 5.25 20.5 8 20.5C11.5 20.5 17 16 17 8Z"
  },
  {
    title: "Circular Economy Designers",
    description: "Systems thinkers and waste-to-resource specialists",
    icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"
  },
  {
    title: "Conservation Biologists",
    description: "Wildlife conservation and habitat restoration experts",
    icon: "M9.5 3A6.5 6.5 0 0 1 16 9.5C16 11.11 15.41 12.59 14.44 13.73L14.71 14H16L21 19L19 21L14 16V14.71L13.73 14.44C12.59 15.41 11.11 16 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3M9.5 5C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"
  },
  {
    title: "Renewable Energy Engineers",
    description: "Clean technology and sustainable energy specialists",
    icon: "M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5A3.5 3.5 0 0 1 15.5 12A3.5 3.5 0 0 1 12 15.5M19.43 12.98C19.47 12.66 19.5 12.33 19.5 12S19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.96 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.73 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12S4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.94C7.96 18.34 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.94L19.05 18.95C19.27 19.03 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z"
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
          Complex ecological challenges require diverse expertise. We activate our 
          global network of specialists to deliver comprehensive regenerative solutions.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8">
          {networkCards.map((card, index) => (
            <NetworkCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}