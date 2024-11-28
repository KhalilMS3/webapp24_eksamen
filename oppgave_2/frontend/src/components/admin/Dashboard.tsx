import React from 'react'
import Header from '../layout/Header'
import Link from 'next/link';

export default function Dashboard() {
  return (
    <>
      <Header>
        <ul className='flex gap-5'>
          <Link className='font-semibold' href={"/admin/opprett-mal"}>Opprett mal</Link>
          <Link className='font-semibold' href={"/admin/maler"}>Maler</Link>
          <Link className='font-semibold' href={"/admin/opprett-arrangement"}>Opprett arrangement</Link>
          <li>(Admin Dashboard)</li>
        </ul>
      </Header>
      <div>Admin Dashboard</div>
    </>
  );
}
