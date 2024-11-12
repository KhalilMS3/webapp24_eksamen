import { Lesson } from "@/types";
import React from "react";

type FormNavProps = {
   courseCreateSteps: { name: string }[];
   currentStep: number;
   handleStep: (index: number) => void;
   isValid: () => boolean;
   lessons: Lesson[];
   handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export default function FormNav(props: FormNavProps) {
   const {
      courseCreateSteps,
      currentStep,
      handleStep,
      isValid,
      lessons,
      handleSubmit,
   } = props;

   const step = courseCreateSteps[currentStep]?.name;

return (
   <nav className="mb-8 flex w-full">
   <ul data-testid="steps" className="flex w-full">
      {courseCreateSteps?.map((courseStep, index) => (
         <button
         type="button"
         data-testid="step"
         key={courseStep.name}
         onClick={() => handleStep(index)}
         className={`h-12 w-1/4 border border-slate-200 ${
            step === courseStep.name
               ? "border-transparent bg-slate-400"
               : "bg-transparent"
         }`}
         >
         {courseStep.name}
         </button>
      ))}
      <button
         disabled={lessons?.length === 0 || !isValid()}
         data-testid="form_submit"
         type="button"
         onClick={handleSubmit}
         className="h-12 w-1/4 border border-slate-200 bg-emerald-300 disabled:bg-transparent disabled:opacity-50"
      >
         Publiser
      </button>
   </ul>
   </nav>
);
}
