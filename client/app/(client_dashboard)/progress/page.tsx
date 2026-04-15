'use client'
import React from "react";
import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import { BadgeCheck } from "lucide-react";
import { useLanguage, interpolate } from "@/lib/i18n/LanguageContext";

// ----- CUSTOM CONNECTOR ----- //
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 45,
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#21E67A",
    borderTopWidth: 4,
    borderRadius: 9999,
  },
}));

// ----- CUSTOM STEP ICON WRAPPER ----- //
function StepPillIcon({ active, completed, label, passed }: any) {
  return (
    <div className="relative flex flex-col items-center gap-2">
      {/* Two ticks */}
      <div className="flex gap-1 scale-125">
        <BadgeCheck  className={`${passed ? "text-[#21E67A]" : "text-gray-500"} !text-[18px]`} />
        <BadgeCheck className={`${passed ? "text-[#21E67A]" : "text-gray-500"} !text-[18px]`} />
      </div>

      {/* MAIN PILL — this is the actual step circle */}
      <div
        className={`rounded-full px-6 py-2 text-sm font-semibold border-4 ${
          passed
            ? "bg-[#21E67A] text-[#083018] border-[#21E67A]"
            : active
            ? "bg-[#0F1F33] text-white border-[#21E67A]"
            : "bg-[#0F1F33] text-white border-gray-600"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function ProgressTrackerPage() {
  const { t } = useLanguage();
  const steps = [
    interpolate(t.dashboard.progress.stages.discover),
    interpolate(t.dashboard.progress.stages.diagnose),
    interpolate(t.dashboard.progress.stages.design),
    interpolate(t.dashboard.progress.stages.deploy),
    interpolate(t.dashboard.progress.stages.grow),
  ];
  return (
    <div className="min-h-screen w-full bg-[#041C32] text-white px-4 py-10 flex flex-col items-center gap-16">
      <h1 className="text-[#4EFFA1] text-xl font-semibold w-full max-w-6xl">{interpolate(t.dashboard.progress.title)}</h1>

      {/* ================= FIRST CARD (DONE) ================= */}
      <div className="w-full max-w-6xl bg-[#0B2A3F] rounded-3xl p-10 shadow-xl relative">
        <div className="absolute right-10 top-10 bg-[#21E67A] text-[#083018] text-xs font-semibold px-4 py-1 rounded-full">{interpolate(t.dashboard.progress.done)}</div>

        <h2 className="text-2xl font-semibold mb-10">{interpolate(t.dashboard.progress.title)}</h2>

        <Stepper alternativeLabel activeStep={4} connector={<CustomConnector />}>          
          {steps.map((label, index) => (
            <Step key={index} completed>
              <StepLabel
                StepIconComponent={() => (
                  <StepPillIcon label={label} passed={true} active={false} />
                )}
              />
            </Step>
          ))}
        </Stepper>

        <div className="grid grid-cols-5 gap-8 mt-10 text-center">
          {steps.map((step, i) => (
            <div key={i}>
              <p className="text-xs text-gray-300 leading-relaxed"></p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECOND CARD (CURRENT LAP) ================= */}
      <div className="w-full max-w-6xl bg-[#0B2A3F] rounded-3xl p-10 shadow-xl relative">
        <div className="absolute right-10 top-10 bg-[#21E67A] text-[#083018] text-xs font-semibold px-4 py-1 rounded-full">{interpolate(t.dashboard.progress.currentLap)}</div>

        <h2 className="text-2xl font-semibold mb-10">{interpolate(t.dashboard.progress.title)}</h2>

        <Stepper alternativeLabel activeStep={1} connector={<CustomConnector />}>          
          {steps.map((label, index) => {
            const passed = index <= 1;
            const active = index === 2;

            return (
              <Step key={index} completed={passed}>
                <StepLabel
                  StepIconComponent={() => (
                    <StepPillIcon label={label} passed={passed} active={active} />
                  )}
                />
              </Step>
            );
          })}
        </Stepper>

        <div className="grid grid-cols-5 gap-8 mt-10 text-center">
          {steps.map((step, i) => (
            <div key={i}>
              <p className="text-xs text-gray-300 leading-relaxed"></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
