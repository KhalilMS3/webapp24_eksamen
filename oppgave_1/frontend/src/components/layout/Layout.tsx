import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'
import { PropsWithChildren } from 'react'
export default function Layout({ children }:PropsWithChildren) {
return (
   <>
   <div
   className="mx-auto grid min-h-screen w-full max-w-7xl grid-rows-[auto_minmax(900px,_1fr)_30px]"
         data-testid="layout">
         <Header />
         <main className="h-full">
            <p>Siden er tom</p>
            {children}</main>
      <Footer/>
   </div>
      </>
)
}
