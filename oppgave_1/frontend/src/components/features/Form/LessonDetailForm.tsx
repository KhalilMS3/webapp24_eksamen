import React from 'react'
import { Lesson as LessonType } from '@/types'
import TipTapEditor from './TipTapEditor';

type LessonDetailFormProps = {
  currentLesson: LessonType;
  handleLessonFieldChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    index: number
   ) => void;
   handleTextEditorChange: (content: string, index: number) => void;

};
export default function LessonDetailForm(props: LessonDetailFormProps) {
   
   const {
      currentLesson,
      handleLessonFieldChange,
      handleTextEditorChange,
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
         <label className="mt-4 flex flex-col" htmlFor={`text-${currentLesson.id}`}>
         <span className="text-sm font-semibold">Tekst*</span>
         </label>
            <TipTapEditor 
               content={currentLesson.text}
               onChange={(content) => handleTextEditorChange(content, Number(currentLesson.id))}/>

   </div>
);
}
