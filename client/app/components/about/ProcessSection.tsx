import Image from "next/image";

const processCards = [
  {
    id: "01",
    title: "The First Meeting", 
    subtitle: "Listen",
    description: "Our work always starts with a focused, customer-centered conversation.",
    details: "In this first meeting, we listen carefully to your story: where the pressure is, what's breaking, and what you're trying to achieve",
    buttonText: "Book your first meeting",
    image: "/first meeting.jpg"
  },
  {
    id: "02",
    title: "The Working Report",
    subtitle: "Think in Writing",
    description: "We document everything we learn about your business and create a clear action plan.",
    details: "This comprehensive report outlines the challenges, opportunities, and recommended solutions tailored to your specific needs",
    buttonText: "View sample report", 
    image: "/working report.jpg"
  },
  {
    id: "03",
    title: "Deepening the Analysis",
    subtitle: "The right input for your case",
    description: "We dive deeper into your specific challenges and requirements.",
    details: "Our team conducts thorough analysis to understand the root causes and develop targeted solutions",
    buttonText: "Learn more",
    image: "/deepening analysis.jpg"
  },
  {
    id: "04",
    title: "Think, Then Listen Again",
    subtitle: "Think, Then Listen Again",
    description: "We refine our understanding through continuous dialogue and feedback.",
    details: "This iterative process ensures our solutions align perfectly with your evolving needs",
    buttonText: "Schedule follow-up",
    image: "/think then listen.jpg"
  },
  {
    id: "05",
    title: "The ORR Report",
    subtitle: "From Insight to Incisive Operation",
    description: "We deliver actionable insights and implementation strategies.",
    details: "Our final report provides clear, executable recommendations with measurable outcomes",
    buttonText: "Get your report",
    image: "/the orr report.jpg"
  },
  {
    id: "06",
    title: "Transparent Pricing",
    subtitle: "Pay for Clarity, not Fluff",
    description: "Clear, upfront pricing with no hidden costs or surprises.",
    details: "We believe in transparent pricing that reflects the value we deliver to your business",
    buttonText: "View pricing",
    image: "/transparent pricing.jpg"
  },
  {
    id: "07",
    title: "Your Decision Point",
    subtitle: "You choose what happens next",
    description: "The final decision on implementation and next steps is entirely yours.",
    details: "We provide recommendations, but you maintain full control over your business decisions",
    buttonText: "Make your choice",
    image: "/your decision point.jpg"
  }
];

export const ProcessSection = () => {
  return (
    <section className="w-full text-white px-6 md:px-12 lg:px-24 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/stars.svg')] bg-cover opacity-20 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processCards.map((card) => (
            <div key={card.id} className="relative rounded-[2rem] overflow-hidden p-1">
              <div className="rounded-[2rem] h-full flex flex-col">
                <div className="h-64 relative">
                  <Image 
                    src={card.image} 
                    alt={card.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div className="w-16 h-16 bg-[#334155] rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {card.id}
                    </div>
                    <div className="w-10 h-10 bg-[#10b981] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">+</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex-1 mb-6">
                    <h3 className="text-[#10b981] text-2xl font-bold mb-4">{card.subtitle}</h3>
                    <p className="text-white text-base font-medium mb-3">{card.description}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{card.details}</p>
                  </div>

                  <button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] text-black font-bold py-4 px-6 rounded-2xl hover:from-[#059669] hover:to-[#047857] transition-all duration-300 text-lg">
                    {card.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
