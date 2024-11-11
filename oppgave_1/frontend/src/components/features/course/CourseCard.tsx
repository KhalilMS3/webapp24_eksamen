import Link from 'next/link'
type CourseCardProps = {
course: {
   id: string;
   title: string;
   slug: string;
   description: string;
   category: string;
};
};

export default function CourseCard({course}: CourseCardProps) {
return (
   <article
   className="rounded-lg border border-slate-400 px-6 py-8"
   key={course.id}
   data-testid="course_wrapper"
   >
   <span className="block text-right capitalize">[{course.category}]</span>
   <h3 className="mb-2 text-base font-bold" data-testid="courses_title">
      <Link href={`/courses/${course.slug}`}>{course.title}</Link>
   </h3>
   <p
      className="mb-6 text-base font-light"
      data-testid="courses_description"
   >
      {course.description}
   </p>
   <Link
      className="font-semibold underline"
      data-testid="courses_url"
      href={`/courses/${course.slug}`}
   >
      Til kurs
   </Link>
   </article>
);
}
