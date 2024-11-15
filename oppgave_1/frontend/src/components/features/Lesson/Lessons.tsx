import Link from 'next/link'
import Lesson from './Lesson'

type LessonsProps = {
courseSlug: Array<{
   id: string,
   slug: string,
   title: string,
}>,
lessonSlug: string,
}
export default function Lessons({courseSlug, lessonSlug}: LessonsProps) {
   return (
      <>
   <Lesson/>
   <ul>
   {courseSlug?.map((lesson) => (
      <li
      key={lesson.id}
      className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
         lessonSlug === lesson.slug
         ? "bg-emerald-300"
         : "bg-transparent"
      }`}
      >
         <Link
         href={`/courses/${courseSlug[0]?.slug}/${lessonSlug}`}
         className="block h-full w-full"
         >
         {lesson.title}
         </Link>
      </li>
   ))}
   </ul>
   </>
);
}
