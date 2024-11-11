import Footer from '@/components/layout/Footer'
import Nav from '@/components/layout/Nav'
import React from 'react'
import { PropsWithChildren } from 'react'
export default function Layout({ children }:PropsWithChildren) {
return (
   <>
   <div
   className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
         data-testid="layout">
         <Nav />
         <main className="h-full">
            {children}
         </main>
      <Footer/>
   </div>
      </>
)
}
