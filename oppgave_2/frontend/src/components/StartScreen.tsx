import Link from 'next/link'
import React from 'react'
import Header from './layout/Header';

export default function StartScreen() {
   return (
     <>
       <Header/>
       <main className="font-sans font-semibold pl-5 mt-25 flex flex-col justify-center">
            <h2
            className='text-3xl pb-3 mt-16'
            >Velg rollen din</h2>
         <section className="flex gap-10 text-l ">
           <Link
             className="border-4 border-current rounded-md  py-5 px-10 text-xl text-white bg-black"
             href={"/kunde"}
           >
            Kunde
           </Link>
           <Link
             className="border-4 border-current rounded-md py-5 px-10 text-xl text-white bg-black"
             href={"/admin"}
           >
             Admin
           </Link>
         </section>
       </main>
     </>
   );
}
