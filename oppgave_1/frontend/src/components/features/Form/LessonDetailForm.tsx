import React from 'react'
import { Lesson as LessonType } from '@/types'

type LessonDetailFormProps = {
  currentLesson: LessonType;
  handleLessonFieldChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
  ) => void;
  addTextBox: () => void;
  removeTextBox: (index: number) => void;
};
export default function LessonDetailForm(props: LessonDetailFormProps) {
   
   const {
      currentLesson,
      handleLessonFieldChange,
      addTextBox,
      removeTextBox
   } = props
return (
   <div className="w-full">
   <label className="mb-4 flex flex-col" htmlFor="title">
      <span className="mb-1 font-semibold">Tittel*</span>
      <input
         className="rounded"
         data-testid="form_lesson_title"
         type="text"
         name="title"
         id="title"
         value={currentLesson?.title}
         onChange={(e) => handleLessonFieldChange(e, 0)}
      />
   </label>
   <label className="mb-4 flex flex-col" htmlFor="slug">
      <span className="mb-1 font-semibold">Slug*</span>
      <input
         className="rounded"
         data-testid="form_lesson_slug"
         type="text"
         name="slug"
         id="slug"
         value={currentLesson?.slug}
         onChange={(e) => handleLessonFieldChange(e, 0)}
      />
   </label>
   <label className="mb-4 flex flex-col" htmlFor="preAmble">
      <span className="mb-1 font-semibold">Ingress*</span>
      <input
         className="rounded"
         data-testid="form_lesson_preAmble"
         type="text"
         name="preAmble"
         id="preAmble"
         value={currentLesson?.preAmble}
         onChange={(e) => handleLessonFieldChange(e, 0)}
      />
   </label>
   {currentLesson?.text?.map((field, index) => (
      <div key={field?.id}>
         <label className="mt-4 flex flex-col" htmlFor={`text-${field?.id}`}>
         <span className="text-sm font-semibold">Tekst*</span>
         <textarea
            data-testid="form_lesson_text"
            name="text"
            id={`text-${field?.id}`}
            value={field?.text}
            onChange={(event) => handleLessonFieldChange(event, index)}
            className="w-full rounded bg-slate-100"
            cols={30}
         />
         </label>
         <button
         className="text-sm font-semibold text-red-400 "
         type="button"
         onClick={() => removeTextBox(index)}
         >
         Fjern
         </button>
      </div>
   ))}
   <button
      className="mt-6 w-full rounded bg-gray-300 px-4 py-3 font-semibold"
      type="button"
      onClick={addTextBox}
      data-testid="form_lesson_add_text"
   >
      + Legg til tekstboks
   </button>
   </div>
);
}
