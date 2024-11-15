"use client";
import { useParams } from "next/navigation";
import CourseLayout from "@/components/layout/CourseLayout";
import useCourseDetails from "@/hooks/useCourseDetails";

export default function Course() {
  const params = useParams() as Record<string, string>;
  const { courseSlug } = params;
  const {course, loading, error} = useCourseDetails(courseSlug)

  if (loading) {
    return <p>Laster inn kurs detaljer...</p>
  }

  if (error) {
    return <p>Kunne ikke hente kurs detaljer: {error}</p>
  }

  if (!courseSlug) {
    return <p>Kunne ikke finne kurse!</p>
  }

  return (
    <CourseLayout>
          <h2 className="text-2xl font-bold" data-testid="course_title">
            {course?.title}
          </h2>
          <p
            className="mt-4 font-semibold leading-relaxed"
            data-testid="course_description"
          >
            {course?.description}
          </p>
    </CourseLayout>
     
  );
}
