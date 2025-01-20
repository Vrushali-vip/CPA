import { useState } from "react";

interface UseMultistepFormProps {
  steps: React.ReactNode[]; // Array of form steps
}

export const useMultistepForm = ({ steps }: UseMultistepFormProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStepIndex(index);
    }
  };

  return {
    currentStep: steps[currentStepIndex],
    currentStepIndex,
    stepsCount: steps.length,
    isLastStep: currentStepIndex === steps.length - 1,
    isFirstStep: currentStepIndex === 0,
    nextStep,
    previousStep,
    goToStep,
  };
};
