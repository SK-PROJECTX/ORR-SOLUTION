"use client";

import { useState } from "react";
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
        placeholder: "Type your message here..."
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
        placeholder: "Type your message here..."
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
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
              index === activeStep ? "bg-lemon" : "bg-gray-600"
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

  const handleComplete = () => {
    // Save final text input if on text question
    let finalAnswers = { ...answers };
    if (currentStepData.type === "text") {
      const key = `${currentSection}-${currentStep}`;
      finalAnswers = { ...finalAnswers, [key]: textInput };
    }

    // Log all answers to console
    console.log("=== ONBOARDING QUESTIONNAIRE RESULTS ===");
    console.log("Complete answers object:", finalAnswers);
    
    // Format and log by section
    Object.keys(questionnaire).forEach(sectionNum => {
      const section = questionnaire[parseInt(sectionNum) as keyof typeof questionnaire];
      console.log(`\n--- ${section.title} ---`);
      
      section.steps.forEach((step, stepIndex) => {
        const key = `${sectionNum}-${stepIndex}`;
        const answer = finalAnswers[key];
        console.log(`${step.question}`);
        console.log(`Answer:`, answer || "No answer provided");
      });
    });

    // Save to localStorage for persistence
    localStorage.setItem('onboarding-answers', JSON.stringify(finalAnswers));
    localStorage.setItem('onboarding-completed', new Date().toISOString());
    
    // Show success toast
    useToastStore.getState().addToast('Onboarding completed successfully!', 'success');
    
    // Optional: Redirect to dashboard after completion
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 2000);
  };

  const getCurrentAnswer = () => {
    const key = `${currentSection}-${currentStep}`;
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
                  placeholder={currentStepData.placeholder}
                  className="w-full bg-[#10253F] border border-[#1A3B56] rounded-xl p-6 text-foreground min-h-[200px] focus:border-[#00D683] focus:outline-none"
                />
              </div>
            ) : (
              <div className={`grid gap-6 mb-16 ${
                currentStepData.options && currentStepData.options.length > 6 
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
                        transition-all min-h-[120px] flex items-center justify-center
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
                className="bg-lemon hover:bg-lemon/90 text-black px-12 py-5 rounded-lg font-semibold text-lg tracking-wide transition-all"
              >
                {currentSection === 6 && currentStep === currentQuestion.steps.length - 1 ? "COMPLETE" : "NEXT →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}