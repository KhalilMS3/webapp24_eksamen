import React from 'react'
import { Lesson as LessonType } from '@/types'

type LessonsAsideProps = {
   lessons: LessonType[],
   currentLesson: number,
   changeCurrentLesson: (index: number) => void,
   addLesson: () => void,
}

export default function LessonsAside(props: LessonsAsideProps) {

const {
      lessons,
      currentLesson,
      changeCurrentLesson,
      addLesson
   } = props

return (
      <aside className="border-r border-slate-200 pr-6">
      <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
      <ul data-testid="lessons">
         {lessons?.length > 0 &&
            lessons?.map((lesson, index) => (
            <li
               className={`borde mb-4 w-full rounded px-4 py-2 text-base ${
                  index === currentLesson
                  ? "border border-transparent bg-emerald-200"
                  : "border border-slate-300 bg-transparent"
               }`}
               key={lesson?.id ?? index}
            >
               <button
                  type="button"
                  data-testid="select_lesson_btn"
                  className="w-full max-w-full truncate pr-2 text-left"
                  onClick={() => changeCurrentLesson(index)}
               >
                  {lesson?.title || `Leksjon ${index + 1}`}
               </button>
            </li>
            ))}
      </ul>
      <div className="flex">
         <button
            className="w-full bg-slate-100 px-2 py-2"
            type="button"
            onClick={addLesson}
            data-testid="form_lesson_add"
         >
            + Ny leksjon
         </button>
      </div>
      </aside>
   );
   }
