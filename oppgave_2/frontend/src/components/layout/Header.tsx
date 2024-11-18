import Link from 'next/link'
import React from 'react'
import { PropsWithChildren } from 'react'

export default function Header(props: PropsWithChildren) {
   const { children } = props
   return (
      <>
         <header className='px-10 py-5'>
            <nav className='flex justify-between items-baseline'>
            <Link href={"/"} className="font-sans text-4xl font-semibold">
               JoinIn
               </Link>
               {children}
            </nav>
      </header>
      </>
   )
}
