import { courses, users } from '@/data/data';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { PropsWithChildren, useEffect, useState } from 'react'

export default function CourseLayout({ children }: PropsWithChildren) {
const [course, setCourse] = useState<any>(null)
const params = useParams() as Record<string, string>
const { courseSlug, lessonSlug } = params

useEffect(() => {
   const courseData = courses.find((course) => course.slug === courseSlug)
   setCourse(courseData)
})
return (
   <>
   <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      <aside className="border-r border-slate-200 pr-6">
         <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
         <ul>
         {course?.lessons?.map((lesson: any) => (
            <li
               key={lesson.id}
               className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2
                  ${lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"}
                  `}
            >
               <Link
               href={`/courses/${courseSlug}/${lesson.slug}`}
               className="block h-full w-full"
               >
               {lesson.title}
               </Link>
            </li>
         ))}
         </ul>
      </aside>
         <section>
            {children}
      </section>
      <aside
         data-testid="enrollments"
         className="border-l border-slate-200 pl-6"
      >
         <h3 className="mb-4 text-base font-bold">Brukere</h3>
         <ul data-testid="course_enrollments">
         {users?.map((user) => (
            <li className="mb-1" key={user.id}>
               {user.name}
            </li>
         ))}
         </ul>
      </aside>
   </div>
   </>
);
}