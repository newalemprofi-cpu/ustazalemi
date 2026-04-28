"use client";

import { Check } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const { t } = useLanguage();

  const steps = [
    { id: 1, label: t("step.form") },
    { id: 2, label: t("step.payment") },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300 ${
                step.id < currentStep
                  ? "bg-blue-600 border-blue-600 text-white"
                  : step.id === currentStep
                  ? "bg-white border-blue-600 text-blue-600"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {step.id < currentStep ? <Check className="w-4 h-4" /> : step.id}
            </div>
            <span
              className={`mt-2 text-xs font-medium text-center leading-tight ${
                step.id <= currentStep ? "text-blue-700" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
