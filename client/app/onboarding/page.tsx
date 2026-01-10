"use client";

import { useState } from "react";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useToastStore } from "@/store/toastStore";

const steps = [1, 2, 3, 4, 5, 6];

const questionnaire = {
  1: {
    title: "JURISDICTION & LANGUAGE SETUP",
    steps: [
      {
        question: "1. Which Jurisdiction will you be operating from?",
        options: ["Malta", "EU (Non-Malta)", "Non-EU", "Others"],
        type: "single"
      },
      {
        question: "2. Preferred interface language:",
        options: ["English", "Maltese", "Italian", "Others"],
        type: "single"
      },
      {
        question: "3. Preferred Keyboard Layout:",
        options: ["EN-US", "EN-UK", "MT", "IT", "Others"],
        type: "single"
      },
      {
        question: "4. Preferred Date/Time format:",
        options: ["DD/MM/YYYY", "MM/DD/YYYY", "24-hour", "12-Hours"],
        type: "single"
      }
    ]
  },
  2: {
    title: "SERVICE AGREEMENT",
    steps: [
      {
        question: "5. Do you confirm that you have read and accept the Service Agreement?",
        options: ["Yes, I accept", "No"],
        type: "single"
      }
    ]
  },
  3: {
    title: "PORTAL OVERVIEW & EXPECTATION",
    steps: [
      {
        question: "6. What are you mainly interested in using the portal for? (Select all that apply)",
        options: ["Understanding ORR services", "Accessing resources/templates", "Requesting meetings", "Using AI for initial guidance", "Getting project/strategy support", "Regulatory or compliance guidance", "Digital systems & automation support", "Environmental/regeneration support", "Others"],
        type: "multiple"
      }
    ]
  },
  4: {
    title: "YOUR BUSINESS/PROJECT PROFILE",
    steps: [
      {
        question: "7. What best describes you?",
        options: ["Founder/Entrepreneur", "Small business owner", "Corporate representative", "Public sector/NGO", "Researcher/Academic", "Individual professional", "Others"],
        type: "single"
      },
      {
        question: "8. What stage is your project or organisation currently in?",
        options: ["Early Exploration", "Pre-Startup/Planning", "Operational but seeking optimisation", "Scaling/Growth", "Unsure"],
        type: "single"
      },
      {
        question: "9. Which area(s) best match your needs? (ORR pillars)",
        options: ["Strategic Advisory & Compliance", "Digital Systems", "Automation & AI", "Living Systems & Regeneration", "Not Sure Yet"],
        type: "single"
      },
      {
        question: "10. Do you currently have an active project in mind?",
        options: ["Yes", "No", "Maybe"],
        type: "single"
      },
      {
        question: "11. Briefly describe your project or business:",
        type: "text",
        placeholder: "Type your message here..." as const
      }
    ]
  },
  5: {
    title: "MEETING & COMMUNICATION PREFERENCES",
    steps: [
      {
        question: "13. Preferred meeting format:",
        options: ["Online (video)", "Phone call", "In-person (subject to availability)"],
        type: "single"
      },
      {
        question: "14. Preferred communication tone:",
        options: ["Concise and direct", "Detailed and explanatory", "Technical", "Non-Technical", "No preference"],
        type: "single"
      },
      {
        question: "15. Preferred contact method for notifications:",
        options: ["Email", "In-portal notifications only", "Both"],
        type: "single"
      }
    ]
  },
  6: {
    title: "OPTIONAL (to improve AI response)",
    steps: [
      {
        question: "16. Would you like the AI assistant to adapt to any specialist domain? (Select all that apply)",
        options: ["Online (video)", "Phone call", "In-person (subject to availability)"],
        type: "multiple"
      },
      {
        question: "17. Any additional context you'd like the system to know?",
        type: "text",
        placeholder: "Type your message here..." as const
      }
    ]
  }
};

function CustomStepper({ activeStep }: { activeStep: number }) {
  return (
    <div className="flex flex-col items-center">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center">
          <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${index === activeStep ? "bg-lemon" : "bg-gray-600"
              }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className="w-0.5 h-16 bg-gray-600 my-2"></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function OnboardingPage() {
  const [currentSection, setCurrentSection] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [textInput, setTextInput] = useState("");

  const currentQuestion = questionnaire[currentSection as keyof typeof questionnaire];
  const currentStepData = currentQuestion.steps[currentStep];

  const handleOptionSelect = (value: string) => {
    const key = `${currentSection}-${currentStep}`;

    if (currentStepData.type === "multiple") {
      const current = answers[key] || [];
      const updated = current.includes(value)
        ? current.filter((item: string) => item !== value)
        : [...current, value];
      setAnswers({ ...answers, [key]: updated });
    } else {
      setAnswers({ ...answers, [key]: value });
    }
  };

  const handleNext = () => {
    if (currentStepData.type === "text") {
      const key = `${currentSection}-${currentStep}`;
      setAnswers({ ...answers, [key]: textInput });
      setTextInput("");
    }

    if (currentStep < currentQuestion.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentSection < 6) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(0);
    }
  };

  const { submitOnboarding, isLoading } = useOnboardingStore();
  const { addToast } = useToastStore();

  const handleComplete = async () => {
    let finalAnswers = { ...answers };
    if (currentStepData.type === "text") {
      const key = `${currentSection}-${currentStep}`;
      finalAnswers = { ...finalAnswers, [key]: textInput };
    }

    // Validate service agreement acceptance
    if (finalAnswers['2-0'] !== 'Yes, I accept') {
      addToast('Please go back to Section 2 and accept the Service Agreement to continue.', 'error');
      setCurrentSection(2);
      setCurrentStep(0);
      return;
    }

    // Validate project description length
    const projectDescription = finalAnswers['4-4'] || '';
    if (projectDescription.trim().length < 10) {
      addToast('Project description must be at least 10 characters long.', 'error');
      setCurrentSection(4);
      setCurrentStep(4);
      return;
    }

    const onboardingData = {
      jurisdiction: finalAnswers['1-0'] === 'Others' ? 'other' : finalAnswers['1-0']?.toLowerCase() || 'malta',
      jurisdiction_other: finalAnswers['1-0'] === 'Others' ? 'other jurisdiction' : undefined,
      language: finalAnswers['1-1'] === 'Others' ? 'other' : finalAnswers['1-1']?.toLowerCase().substring(0, 2) || 'en',
      language_other: finalAnswers['1-1'] === 'Others' ? 'other language' : undefined,
      keyboard_layout: finalAnswers['1-2'] === 'Others' ? 'other' : finalAnswers['1-2']?.toLowerCase().replace('-', '_') || 'en_us',
      keyboard_other: finalAnswers['1-2'] === 'Others' ? 'other layout' : undefined,
      date_format: finalAnswers['1-3']?.includes('DD/MM') ? 'dd_mm_yyyy' : 'mm_dd_yyyy',
      time_format_24h: finalAnswers['1-3']?.includes('24-hour') || false,
      accepted_service_agreement: finalAnswers['2-0'] === 'Yes, I accept' || true,
      portal_interests: Array.isArray(finalAnswers['3-0']) ? finalAnswers['3-0'].join(', ') : finalAnswers['3-0'] || '',
      portal_interests_other: finalAnswers['3-0']?.includes('Others') ? 'other interests' : undefined,
      user_type: finalAnswers['4-0'] === 'Others' ? 'other' : 
        finalAnswers['4-0'] === 'Small business owner' ? 'small_business' :
        finalAnswers['4-0'] === 'Founder/Entrepreneur' ? 'founder' :
        finalAnswers['4-0'] === 'Corporate representative' ? 'corporate' :
        finalAnswers['4-0'] === 'Public sector/NGO' ? 'public_ngo' :
        finalAnswers['4-0'] === 'Researcher/Academic' ? 'academic' :
        finalAnswers['4-0'] === 'Individual professional' ? 'professional' : 'founder',
      user_type_other: finalAnswers['4-0'] === 'Others' ? 'other user type' : undefined,
      project_stage: finalAnswers['4-1'] === 'Early Exploration' ? 'exploration' :
        finalAnswers['4-1'] === 'Pre-Startup/Planning' ? 'pre_startup' :
        finalAnswers['4-1'] === 'Operational but seeking optimisation' ? 'operational' :
        finalAnswers['4-1'] === 'Scaling/Growth' ? 'scaling' :
        finalAnswers['4-1'] === 'Unsure' ? 'unsure' : 'exploration',
      orr_pillars: finalAnswers['4-2'] || '',
      has_active_project: finalAnswers['4-3']?.toLowerCase() || 'yes',
      project_description: finalAnswers['4-4'] || '',
      meeting_format: finalAnswers['5-0']?.toLowerCase().includes('video') ? 'video' : 'phone',
      communication_tone: finalAnswers['5-1'] === 'No preference' ? 'concise' : finalAnswers['5-1']?.toLowerCase().split(' ')[0] || 'concise',
      notification_preference: finalAnswers['5-2']?.toLowerCase().includes('email') ? 'email' : finalAnswers['5-2']?.toLowerCase().includes('both') ? 'both' : 'email',
      ai_specialist_domains: Array.isArray(finalAnswers['6-0']) ? finalAnswers['6-0'].join(', ') : finalAnswers['6-0'] || '',
      ai_specialist_other: finalAnswers['6-0']?.includes('Others') ? 'other domains' : undefined,
      additional_context: finalAnswers['6-1'] || '',
    };

    await submitOnboarding(onboardingData);
  };

  const getCurrentAnswer = () => {
    const key = `${currentSection}-${currentStep}`;
    console.log("hi there");
    
    return answers[key] || (currentStepData.type === "multiple" ? [] : "");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <div className="w-20 flex justify-center py-10">
          <CustomStepper activeStep={currentSection - 1} />
        </div>

        <div className="flex-1 flex flex-col justify-center min-h-screen px-6 py-10">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-8">{currentQuestion.title}</h2>
            <p className="text-lg mb-16">{currentStepData.question}</p>

            {currentStepData.type === "text" ? (
              <div className="mb-16">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={(currentStepData as any).placeholder || "Type your message here..."}
                  className="w-full bg-[#10253F] border border-[#1A3B56] rounded-xl p-6 text-foreground min-h-[200px] focus:border-[#00D683] focus:outline-none"
                />
              </div>
            ) : (
              <div className={`grid gap-6 mb-16 ${currentStepData.options && currentStepData.options.length > 6
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : currentStepData.options && currentStepData.options.length > 3
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                }`}>
                {currentStepData.options?.map((option) => {
                  const currentAnswer = getCurrentAnswer();
                  const isActive = currentStepData.type === "multiple"
                    ? currentAnswer.includes(option)
                    : currentAnswer === option;

                  return (
                    <div
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className={`
                        relative cursor-pointer border rounded-xl px-6 py-8 text-center text-base 
                        transition-all flex items-center justify-center w-full
                        ${isActive
                          ? "border-[#00D683] bg-[#10253F]"
                          : "border-[#1A3B56] bg-transparent"
                        }
                      `}
                    >
                      <div
                        className={`absolute right-3 top-3 w-4 h-4 rounded-full border
                          ${isActive
                            ? "border-[#00D683] bg-[#00D683]"
                            : "border-[#1A3B56]"
                          }`}
                      ></div>
                      <span className="text-sm md:text-base">{option}</span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="border-b border-gray-600 my-16"></div>

            <div className="flex justify-between">
              {currentSection > 1 || currentStep > 0 ? (
                <button
                  onClick={() => {
                    if (currentStep > 0) {
                      setCurrentStep(currentStep - 1);
                    } else if (currentSection > 1) {
                      setCurrentSection(currentSection - 1);
                      setCurrentStep(questionnaire[(currentSection - 1) as keyof typeof questionnaire].steps.length - 1);
                    }
                  }}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-12 py-5 rounded-lg font-semibold text-lg tracking-wide transition-all"
                >
                  ← BACK
                </button>
              ) : <div></div>}

              <button
                onClick={currentSection === 6 && currentStep === currentQuestion.steps.length - 1 ? handleComplete : handleNext}
                disabled={isLoading}
                className="bg-lemon hover:bg-lemon/90 text-black px-12 py-5 rounded-lg font-semibold text-lg tracking-wide transition-all disabled:opacity-50"
              >
                {isLoading ? "SUBMITTING..." : currentSection === 6 && currentStep === currentQuestion.steps.length - 1 ? "COMPLETE" : "NEXT →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}