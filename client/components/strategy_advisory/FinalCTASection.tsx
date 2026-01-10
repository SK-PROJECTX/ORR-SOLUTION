import FinalCTASection from "../shared/FinalCTASection";

interface StrategyFinalCTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

export default function StrategyFinalCTASection({ title, description, buttonText }: StrategyFinalCTASectionProps) {
  return (
    <FinalCTASection
      title={title || "Ready to Navigate Complexity"}
      highlightedTitle="with Confidence?"
      description={description || "Let's assess your compliance landscape and design strategies that protect and enable your growth."}
      buttonText={buttonText || "Book a free compliance assessment"}
    />
  )
}