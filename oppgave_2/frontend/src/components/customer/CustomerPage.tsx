import React from 'react'
import Header from '../layout/Header'
import Link from 'next/link';

export default function CustomerPage() {
  return (
    <>
      <Header>
        <ul>
          <li>(Kundeside)</li>
        </ul>
        </Header>
        <section className='flex flex-col gap-10 p-10'>
         <div className='text-xl'>
            <h1>Hei og velkommen til <b>JoinIn</b></h1>
            <p>Platformen som gjør booking av arrangementer mye enklere</p>
         </div>
         <Link  className="border bg-black text-white px-2.5 py-2 text-center w-1/12 rounded-md" href={"/kunde/arrangementer"}>Til arrangementer</Link>
        </section>
    </>
  );
}
