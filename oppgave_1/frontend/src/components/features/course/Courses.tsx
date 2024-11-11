"use client";
import { useState, } from "react";
import {
categories,
courses,
} from "@/data/data";
import CourseCard from "./CourseCard";

export default function Courses() {

const [value, setValue] = useState("");
const [data, setData] = useState(courses);

const handleFilter = (event: any) => {
  const category = event.target.value;
  setValue(category);
  if (category && category.length > 0) {
    const content = courses.filter((course) =>
      course.category.toLocaleLowerCase().includes(category.toLowerCase())
    );
    setData(content);
  } else {
    setData(courses);
  }
};

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
      {data && data.length > 0 ? (
        data.map((course) => (
          <CourseCard key={course.id} course={course}/>
        ))
      ) : (
        <p data-testid="empty">Ingen kurs</p>
      )}
    </section>
  </>
);
}
