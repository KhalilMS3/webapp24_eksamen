import Link from 'next/link';
import Header from '../layout/Header';

export default function AdminNavBar() {
   return (
     <Header>
       <ul className="flex gap-5 items-baseline">
         <Link
           className="font-semibold border px-4 py-2 border-slate-400 rounded  bg-slate-400 hover:bg-slate-500"
           href={"/admin/maler"}
         >
           Maler
         </Link>
         <Link
           className="font-semibold border px-4 py-2 border-slate-400 rounded  bg-slate-400 hover:bg-slate-500"
           href={"/admin/arrangementer"}
         >
           Arrangementer
         </Link>
         <Link
           className="font-semibold border px-4 py-2 border-green-500 bg-green-700 rounded text-white"
           href={"/admin/opprett-mal"}
         >
           Opprett mal +
         </Link>
         <Link
           className="font-semibold border px-4 py-2 border-green-500 bg-green-700 rounded text-white "
           href={"/admin/opprett-arrangement"}
         >
           Opprett arrangement +
         </Link>
         <li>(Admin Dashboard)</li>
       </ul>
     </Header>
   );
}
