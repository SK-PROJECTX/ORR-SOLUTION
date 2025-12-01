interface HowWeWorkSectionProps {
  subtitle: string;
  description: string;
  sections: {
    title: string;
    subtitle?: string;
    content: string[];
  }[];
  layout?: 'grid' | 'single';
}

export default function HowWeWorkSection({ subtitle, description, sections, layout = 'grid' }: HowWeWorkSectionProps) {
  return (
    <section className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          How we work:
        </h2>
        <h3 className="text-3xl font-bold text-[#47ff4c]">
          {subtitle}
        </h3>
        <p className="text-slate-200 text-lg mt-6 max-w-4xl mx-auto">
          {description}
        </p>
      </div>

      {layout === 'grid' ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="space-y-8">
              <div className="bg-card rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {section.title}
                </h3>
                {section.subtitle && (
                  <h4 className="text-slate-300 text-lg font-bold mb-6">
                    {section.subtitle}
                  </h4>
                )}
                <div className="space-y-4 text-slate-300 text-sm">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-card rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className={`p-8 ${index === 0 ? 'border-r border-r-[#0ec277]' : ''}`}>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {section.title}
                </h3>
                {section.subtitle && (
                  <h4 className="text-slate-300 text-lg font-bold mb-6">
                    {section.subtitle}
                  </h4>
                )}
                <div className="space-y-4 text-slate-300">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}