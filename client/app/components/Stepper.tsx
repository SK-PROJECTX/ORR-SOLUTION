"use client";

interface StepperProps {
  steps: string[];
}

export default function Stepper({ steps }: StepperProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-4 sm:gap-6">
          {/* Step Bullet and Connector */}
          <div className="flex flex-col items-center">
            {/* Step Bullet */}
            <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 bg-[#1F6F75] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 bg-[#3DFF7C] rounded-full" />
            </div>
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="w-0.5 h-8 sm:h-10 lg:h-12 bg-gradient-to-b from-[#3DFF7C] to-[#1F6F75]" />
            )}
          </div>
          
          {/* Step Content */}
          <div className="flex-1 pt-0.5">
            <p className="text-[#D4D8E3] leading-relaxed text-sm sm:text-base lg:text-lg">
              {step}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}