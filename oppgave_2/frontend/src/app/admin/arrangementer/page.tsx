import AdminEvents from '@/components/admin/AdminEvents';
import Dashboard from '@/components/admin/Dashboard';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {

   return (
      <Dashboard>
      <AdminEvents/>
      </Dashboard>
   );
}
