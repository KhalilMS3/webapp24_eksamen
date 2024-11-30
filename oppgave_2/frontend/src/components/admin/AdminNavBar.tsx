import Link from 'next/link';
import React, { PropsWithChildren } from 'react'
import Header from '../layout/Header';

export default function AdminNavBar(props: PropsWithChildren) {
   const {children} = props
   return (
     <Header>
         
    <ul className="flex gap-5">
      <Link className="font-semibold" href={"/admin/opprett-mal"}>
        Opprett mal
      </Link>
      <Link className="font-semibold" href={"/admin/maler"}>
        Maler
      </Link>
      <Link className="font-semibold" href={"/admin/arrangementer"}>
        Arrangementer
      </Link>
      <Link className="font-semibold" href={"/admin/opprett-arrangement"}>
        Opprett arrangement
      </Link>
      <li>(Admin Dashboard)</li>
    </ul>
      </Header>
     

  )
}
