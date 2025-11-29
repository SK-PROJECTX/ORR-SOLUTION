export default function MidClientJourneySection() {
  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 star opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white">
          Mid Client <span className="text-primary">Journey</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-primary rounded-3xl h-60 w-full"></div>
          ))}
        </div>
      </div>
    </section>
  );
}