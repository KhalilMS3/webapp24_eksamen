import { generateYears, months } from '@/data/data'
import React from 'react'

type FilterAsideProps = {
  setMonth: (value: string | null) => void
  setYear: (value: string | null) => void
  setType: (value: string | null) => void
  setStatus: (value: string | null) => void
}
export default function FilterAside(props: FilterAsideProps) {
  const {
    setMonth, setYear, setType, setStatus
  } = props

  // Auto generate of years, 3 years before and after current year
  const years = generateYears(-3, 3);
  return (
    <aside className="p-5 w-1/4  bg-rounded-md">
      <h3 className="font-semibold mb-3">Filterer arrangementer</h3>
      <section className="flex flex-col gap-4">
        <label htmlFor="year-filter">År</label>
        <select
          name="year-filter"
          id="year-filter"
          className="border rounded p-3"
          onChange={(e) => setYear(e.target.value || null)}
        >
          <option value="">Alle</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label htmlFor="month-filter">Måned</label>
        <select
          name="month-filter"
          id="month-filter"
          className="border rounded p-3"
          onChange={(e) => setMonth(e.target.value || null)}
        >
          <option value="">Alle</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
        <label htmlFor="type">Type</label>
        <select
          id="type"
          onChange={(e) => setType(e.target.value || null)}
          className="p-2 border rounded"
        >
          <option value="">Alle</option>
          <option value="Sport">Sport</option>
          <option value="Møte">Møte</option>
          <option value="Trening">Trening</option>
          <option value="Workshop">Workshop</option>
          <option value="Familie">Familie</option>
        </select>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          onChange={(e) => setStatus(e.target.value || null)}
          className="p-2 border rounded"
        >
          <option value="">Alle</option>
          <option value="Ledig">Ledig</option>
          <option value="Fullbooket">Fullbooket</option>
        </select>
      </section>
    </aside>
  );
}
