import All from "@/pages/All";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full">
      <p>Hei, navigere til: </p>
      <p>
        <b>
          <Link href="/courses">Kurs</Link>{" "}
        </b>
        for å se alle kurs
      </p>
      <p>
        <b><Link href="/courseForm">Nytt kurs</Link></b> for å opprette et nytt kurs
      </p>
    </main>
  );
}
import React from "react";
