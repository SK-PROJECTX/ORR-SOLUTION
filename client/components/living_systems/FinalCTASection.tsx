import { getRichTextHTML } from "@/lib/rich-text-utils";

interface LivingSystemsFinalCTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function LivingSystemsFinalCTASection({ title, description, buttonText }: LivingSystemsFinalCTASectionProps) {
  return (
    <section className="relative z-30 py-24 text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span dangerouslySetInnerHTML={getRichTextHTML(title || "Ready to Work With Your Living Systems,")} />
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold text-[#47ff4c] mb-8">
          <span dangerouslySetInnerHTML={getRichTextHTML("Not Against Them?")} />
        </h2>
        <p className="text-slate-200 text-lg mb-12 max-w-3xl mx-auto">
          <span dangerouslySetInnerHTML={getRichTextHTML(description || "Let's help your business discover and design systems that regenerate rather than deplete.")} />
        </p>
        <button className="bg-gradient-to-r from-[#47ff4c] to-[#0ec277] text-black px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg hover:shadow-[#47ff4c]/25 transition-all duration-300">
          <span dangerouslySetInnerHTML={getRichTextHTML(buttonText || "Book a free Living Systems assessment")} />
        </button>
      </div>
    </section>
  )
}