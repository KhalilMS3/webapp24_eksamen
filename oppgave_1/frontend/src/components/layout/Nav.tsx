import React from 'react'
import Link from 'next/link'
export default function Nav() {
  return (
    <nav className="mt-6 mb-12 flex justify-between">
      <h1 className="text-lg font-bold uppercase" data-testid="logo">
        <Link href="/">Mikro LMS</Link>
      </h1>
      <ul className="flex gap-8" data-testid="nav">
        <li className="text-base font-semibold" data-testid="nav_courses">
          <Link href="/courses">Kurs</Link>
        </li>
        <li className="text-base font-semibold" data-testid="nav_new">
          <Link href="/courseForm">Nytt kurs</Link>
        </li>
      </ul>
    </nav>
  );
}
