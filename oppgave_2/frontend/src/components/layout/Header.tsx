import React from 'react'
import { PropsWithChildren } from 'react'

export default function Header(props: PropsWithChildren) {
   const { children } = props
   return (
      <>
         <header className='px-10 py-5'>
            <nav className='flex justify-between items-baseline'>
            <h1 className="font-sans text-4xl font-semibold">
               JoinIn
               </h1>
               {children}
            </nav>
      </header>
      </>
   )
}
