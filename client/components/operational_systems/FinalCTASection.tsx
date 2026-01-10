import FinalCTASection from "../shared/FinalCTASection";

interface OperationalFinalCTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function OperationalFinalCTASection({ title, description, buttonText }: OperationalFinalCTASectionProps) {
  return (
    <FinalCTASection
      title={title || "Ready to Build"}
      highlightedTitle="Better Systems?"
      description={description || "Let's Diagnose what's slowing you down and design systems that work."}
      buttonText={buttonText || "Book a free operational assessment"}
    />
  )
}