"use client";
import { useParams } from "next/navigation";
import CourseLayout from "@/components/layout/CourseLayout";
import useCourseDetails from "@/hooks/useCourseDetails";
import useUpdateCourseCategory from "@/hooks/useUpdateCourseCategory";
import { useState } from "react";

export default function Course() {
  const params = useParams() as Record<string, string>;
  const { courseSlug } = params;
  const {course, loading, error} = useCourseDetails(courseSlug)
  const { updateCategory, loading: updateLoading, error: updateError} = useUpdateCourseCategory()
  const [category, setCategory] = useState<string>(course?.category || "")
  
    
  if (loading) {
    return <p>Laster inn kurs detaljer...</p>
  }

  if (error) {
    return <p>Kunne ikke hente kurs detaljer: {error}</p>
  }

  if (!courseSlug) {
    return <p>Kunne ikke finne kurse!</p>
  }

  const handleUpdateCategory = async () => {
    if (!category) {
      return <p>vennligst oppgi en kategori</p>;
    }

    const result = await updateCategory(courseSlug, category);
    if (result.success) {
      alert("Kategorien er oppdatert!");
    } else {
      alert(`Kunne ikke oppdatere kategori: ${result.error}`);
    }
  };

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
      <section className="mt-8">
        {
          <p>
            nåværende kurs kategori: <b>{course?.category}</b>
          </p>
        }
        <label htmlFor="category" className="block mb-2 text-sm font-bold">
          Oppdater kategori:
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
        />
        <button
          onClick={handleUpdateCategory}
          className="px-4 py-2 text-white bg-emerald-600 rounded"
          disabled={updateLoading}
        >
          {updateLoading ? "Oppdaterer..." : "Oppdater Kategori"}
        </button>
        {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
      </section>
    </CourseLayout>
  );
}
