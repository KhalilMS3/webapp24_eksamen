import { generateYears, months } from '@/data/data'
import React from 'react'

type FilterAsideProps = {
  month: string,
  year: string,
  type: string,
  status: string,
  setMonth: (value: string) => void
  setYear: (value: string) => void
  setType: (value: string) => void
  setStatus: (value: string) => void
}
export default function FilterAside(props: FilterAsideProps) {
  const {
    month, year, type, status,
    setMonth, setYear, setType, setStatus
  } = props

  const handleReset = () => {
    setMonth("")
    setYear("")
    setType("")
    setStatus("")
  }
  // Auto generate of years, 3 years before and after current year
  const years = generateYears(-3, 3);
  return (
    <aside className="p-5 bg-rounded-md">
      <h3 className="font-semibold mb-3">Filterer arrangementer</h3>
      <section className="flex flex-col gap-4">
        <label htmlFor="year-filter">År</label>
        <select
          name="year-filter"
          id="year-filter"
          value={year || ""}
          className="border rounded p-3"
          onChange={(e) => setYear(e.target.value || "")}
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
          value={month || ""}
          className="border rounded p-3"
          onChange={(e) => setMonth(e.target.value || "")}
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
          onChange={(e) => setType(e.target.value || "")}
          value={type || ""}
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
          name="status"
          id="status"
          value={status || ""}
          onChange={(e) => setStatus(e.target.value || "")}
          className="p-2 border rounded"
        >
          <option value="">Alle</option>
          <option value="Ledig">Ledig</option>
          <option value="Fullbooket">Fullbooket</option>
        </select>
        <button
          onClick={handleReset}
          className="rounded p-3 bg-green-600 text-white font-semibold"
        >
          Reset Filter
        </button>
      </section>
    </aside>
  );
}
