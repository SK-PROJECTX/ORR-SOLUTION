"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/store/onboardingStore";
import { useToastStore } from "@/store/toastStore";

function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder
}: {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#10253F] border border-[#1A3B56] rounded-xl px-6 py-5 text-foreground text-base focus-within:border-[#00D683] flex justify-between items-center cursor-pointer transition-colors hover:border-[#00D683]/50"
      >
        <span className={value ? "text-foreground" : "text-gray-400"}>
          {value || placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#00D683"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#10253F] border border-[#1A3B56] rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-[#1A3B56]">
            <input
              type="text"
              className="w-full bg-[#0B1829] text-foreground text-sm rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#00D683]"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#00D683] scrollbar-track-transparent">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`px-6 py-3 cursor-pointer text-sm transition-colors hover:bg-[#1A3B56] ${
                    value === option ? 'bg-[#1A3B56] text-[#00D683]' : 'text-foreground'
                  }`}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-sm text-gray-400 text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const steps = [1, 2, 3, 4, 5, 6];

const questionnaire = {
  1: {
    title: "JURISDICTION & LANGUAGE SETUP",
    steps: [
      {
        question: "1. Which Jurisdiction will you be operating from?",
        options: [
          "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
          "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
          "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
          "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
          "Croatia", "Cuba", "Cyprus", "Czechia", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
          "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
          "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti",
          "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
          "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
          "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
          "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
          "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
          "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
          "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
          "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
          "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
          "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
          "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
          "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
          "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
        ],
        type: "dropdown",
        placeholder: "Select your jurisdiction"
      },
      {
        question: "2. Preferred interface language:",
        options: [
          "English", "Maltese", "Arabic", "Bengali", "Bulgarian", "Catalan", "Chinese", "Croatian", "Czech", "Danish", "Dutch",
          "Estonian", "Filipino", "Finnish", "French", "German", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian", "Indonesian",
          "Italian", "Japanese", "Kannada", "Korean", "Latvian", "Lithuanian", "Malay", "Malayalam", "Marathi", "Norwegian",
          "Persian", "Polish", "Portuguese", "Punjabi", "Romanian", "Russian", "Serbian", "Slovak", "Slovenian", "Spanish",
          "Swahili", "Swedish", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese"
        ],
        type: "dropdown",
        placeholder: "Select your language"
      },
      {
        question: "3. Preferred Keyboard Layout:",
        options: ["EN-US", "EN-UK", "MT", "IT", "Others"],
        type: "dropdown",
        placeholder: "Select keyboard layout"
      },
      {
        question: "4. Preferred Date/Time format:",
        options: ["DD/MM/YYYY", "MM/DD/YYYY", "24-hour", "12-Hours"],
        type: "dropdown",
        placeholder: "Select date/time format"
      }
    ]
  },
  2: {
    title: "SERVICE AGREEMENT",
    steps: [
      {
        question: "5. Do you confirm that you have read and accept the Service Agreement?",
        options: ["Yes, I accept", "No"],
        type: "single",
        helpLink: { text: "Read the full Service Agreement", url: "/legal-policy" }
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
        question: "9. Which area(s) best match your needs? (ORR pillars) — Select all that apply",
        options: ["Strategic Advisory & Compliance", "Digital Systems", "Automation & AI", "Living Systems & Regeneration", "Not Sure Yet"],
        type: "multiple"
      },
      {
        question: "10. Do you currently have an active project in mind?",
        options: ["Yes", "No", "Maybe"],
        type: "single"
      },
      {
        question: "11. Briefly describe your project or business:",
        type: "text",
        options: [] as string[],
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
        question: "14. Preferred communication tone: (Select all that apply)",
        options: ["Concise and direct", "Detailed and explanatory", "Technical", "Non-Technical", "No preference"],
        type: "multiple"
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
        question: "16. Any additional context you'd like the system to know?",
        type: "text",
        options: [] as string[],
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

  const router = useRouter();
  const { checkOnboardingStatus, submitOnboarding, isLoading } = useOnboardingStore();
  const { addToast } = useToastStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const isCompleted = await checkOnboardingStatus();
        if (isCompleted) {
          router.replace('/dashboard');
        } else {
          setIsChecking(false);
        }
      } catch (error) {
        setIsChecking(false);
      }
    };
    checkStatus();
  }, [checkOnboardingStatus, router]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-lemon border-t-transparent rounded-full mb-4"></div>
        <p className="text-foreground/60">Checking onboarding status...</p>
      </div>
    );
  }

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
      orr_pillars: Array.isArray(finalAnswers['4-2']) ? finalAnswers['4-2'].join(', ') : finalAnswers['4-2'] || '',
      has_active_project: finalAnswers['4-3']?.toLowerCase() || 'yes',
      project_description: finalAnswers['4-4'] || '',
      meeting_format: finalAnswers['5-0']?.toLowerCase().includes('video') ? 'video' : 'phone',
      communication_tone: (() => {
        const tone = finalAnswers['5-1'];
        const toneMap: Record<string, string> = {
          'Concise and direct': 'concise',
          'Detailed and explanatory': 'detailed',
          'Technical': 'technical',
          'Non-Technical': 'non_technical',
          'No preference': 'no_preference'
        };

        if (Array.isArray(tone)) {
          if (tone.includes('No preference')) return ['no_preference'];
          return tone.map((t: string) => toneMap[t] || t.toLowerCase().split(' ')[0]);
        }
        return tone === 'No preference' ? ['no_preference'] : [toneMap[tone as string] || tone?.toLowerCase().split(' ')[0] || 'concise'];
      })(),
      notification_preference: finalAnswers['5-2']?.toLowerCase().includes('email') ? 'email' : finalAnswers['5-2']?.toLowerCase().includes('both') ? 'both' : 'email',
      ai_specialist_domains: '',
      ai_specialist_other: undefined,
      additional_context: finalAnswers['6-0'] || '',
    };

    await submitOnboarding(onboardingData);
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
            <p className="text-lg mb-4">{currentStepData.question}</p>
            {(currentStepData as any).helpLink && (
              <a
                href={(currentStepData as any).helpLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#00D683] hover:text-[#00D683]/80 text-sm font-medium mb-12 underline underline-offset-4"
              >
                {(currentStepData as any).helpLink.text} ↗
              </a>
            )}
            {!(currentStepData as any).helpLink && <div className="mb-12" />}

            {currentStepData.type === "text" ? (
              <div className="mb-16">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder={(currentStepData as any).placeholder || "Type your message here..."}
                  className="w-full bg-[#10253F] border border-[#1A3B56] rounded-xl p-6 text-foreground min-h-[200px] focus:border-[#00D683] focus:outline-none"
                />
              </div>
            ) : currentStepData.type === "dropdown" ? (
              <div className="mb-16 max-w-md">
                <SearchableDropdown
                  options={currentStepData.options || []}
                  value={getCurrentAnswer() || ""}
                  onChange={(val) => {
                    const key = `${currentSection}-${currentStep}`;
                    setAnswers({ ...answers, [key]: val });
                  }}
                  placeholder={(currentStepData as any).placeholder || "Select an option"}
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
                        flex items-center justify-center w-full
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

            <div className="my-16"></div>

            <div className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-0">
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
                  className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white px-6 py-4 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-lg font-semibold text-base sm:text-lg tracking-wide"
                >
                  ← BACK
                </button>
              ) : <div className="hidden sm:block"></div>}

              <button
                onClick={currentSection === 6 && currentStep === currentQuestion.steps.length - 1 ? handleComplete : handleNext}
                disabled={isLoading}
                className="w-full sm:w-auto bg-lemon hover:bg-lemon/90 text-black px-6 py-4 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-lg font-semibold text-base sm:text-lg tracking-wide disabled:opacity-50"
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