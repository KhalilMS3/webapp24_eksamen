"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { courses } from "@/data/data";
import CourseLayout from "@/components/layout/CourseLayout";

export default function Course() {
  const params = useParams() as Record<string, string>;
  const { courseSlug } = params;

  const [content, setContent] = useState<any>();

  useEffect(() => {
    const courseData = courses.find((course) => course.slug === courseSlug);
    setContent(courseData);
  }, [courseSlug]);

  return (
    <CourseLayout>
          <h2 className="text-2xl font-bold" data-testid="course_title">
            {content?.title}
          </h2>
          <p
            className="mt-4 font-semibold leading-relaxed"
            data-testid="course_description"
          >
            {content?.description}
          </p>
    </CourseLayout>
     
  );
}
