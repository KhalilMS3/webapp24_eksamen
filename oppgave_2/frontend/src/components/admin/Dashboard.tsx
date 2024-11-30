import React, { PropsWithChildren } from 'react'
import Header from '../layout/Header'
import Link from 'next/link';
import AdminNavBar from './AdminNavBar';

export default function Dashboard(props: PropsWithChildren) {
  const {children} = props
  return (
    <>
      <AdminNavBar />
      <main>{children}</main>
    </>
  );
}
