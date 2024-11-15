"use client";
import { useEffect, useState, } from "react";
import { categories } from "@/data/data";
import CourseCard from "./CourseCard";
import useCourse from "@/hooks/useCourse";
import { Course } from "@/types";

export default function Courses() {
  const {courses, loading, error} = useCourse()
  const [value, setValue] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>( [])
  
  const handleFilter = (event: any) => {
  const category = event.target.value;
  setValue(category);
  if (category && category.length > 0) {
    const content = (courses || []).filter((course) =>
      course.category.toLocaleLowerCase().includes(category.toLowerCase())
    );
    setFilteredCourses(content);
  } else {
    setFilteredCourses(courses || []);
  }
  };
  
  useEffect(() => {
    if (courses) {
      setFilteredCourses(courses)
    }
  },[courses])

  if (loading) {
    return <p>Laster inn kurs...</p>
  }
  if (error) {
    return <p>Kunne ikke hente kurs: {error}</p>
  }
return (
  <>
    <header className="mt-8 flex items-center justify-between">
      <h2 className="mb-6 text-xl font-bold" data-testid="title">
        Alle kurs
      </h2>
      <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
        <span className="sr-only mb-1 block">Velg kategori:</span>
        <select
          id="filter"
          name="filter"
          data-testid="filter"
          value={value}
          onChange={handleFilter}
          className="min-w-[200px] rounded bg-slate-200"
        >
          <option value="">Alle</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </header>
    <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
      {filteredCourses && filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course}/>
        ))
      ) : (
        <p data-testid="empty">Ingen kurs</p>
      )}
    </section>
  </>
);
}
