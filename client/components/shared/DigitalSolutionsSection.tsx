import Image from "next/image";

interface DigitalSolutionsSectionProps {
  title: string;
  subtitle?: string;
  description: string;
  imageAlt: string;
  whoIsThisFor: string[];
  features: string[];
}

export default function DigitalSolutionsSection({
  title,
  subtitle,
  description,
  imageAlt,
  whoIsThisFor,
  features
}: DigitalSolutionsSectionProps) {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Image and Who is this for */}
          <div className="space-y-8">
            {/* Image */}
            <div className="rounded-2xl h-80 flex items-center justify-center">
              <Image 
                src="/network-visualization.jpg"
                alt={imageAlt}
                className="w-full h-full object-cover rounded-2xl"
                width={800}
                height={600}
              />
            </div>
            {/* Who is this for? */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Who is <span className="text-primary">this for?</span>
              </h3>
              <ul className="space-y-3 text-slate-300">
                {whoIsThisFor.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Content and Features */}
          <div className="space-y-8">
            {/* Header */}
            <div className="py-18">
              <h2 className="text-4xl font-bold text-white mb-4">
                {title}
              </h2>
              {subtitle && (
                <h2 className="text-4xl font-bold text-primary mb-6">
                  {subtitle}
                </h2>
              )}
              <p className="text-slate-200 text-lg">
                {description}
              </p>
            </div>

            {/* Features box */}
            <div className="border-2 border-primary rounded-2xl px-6 py-12">
              <ul className="space-y-3 text-slate-300 text-sm">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}