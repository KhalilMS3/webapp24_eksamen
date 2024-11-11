"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { courses, users } from "@/data/data";
import Link from "next/link";

export default function Course() {
  const params = useParams() as Record<string, string>;
  const { courseSlug } = params;

  const [content, setContent] = useState<any>();

  useEffect(() => {
    const courseData = courses.find((course) => course.slug === courseSlug);
    setContent(courseData);
  }, [courseSlug]);

  return (
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul>
          {content?.lessons?.map((lesson: any) => (
            <li
              key={lesson.id}
              className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2`}
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
        <>
          <h2 className="text-2xl font-bold" data-testid="course_title">
            {content?.title}
          </h2>
          <p
            className="mt-4 font-semibold leading-relaxed"
            data-testid="course_description"
          >
            {content?.description}
          </p>
        </>
      </section>
      <aside
        data-testid="enrollments"
        className="border-l border-slate-200 pl-6"
      >
        <h3 className="mb-4 text-base font-bold">Deltakere</h3>
        <ul data-testid="course_enrollments">
          {users?.map((user) => (
            <li className="mb-1" key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
