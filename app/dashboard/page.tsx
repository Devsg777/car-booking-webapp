import React, { Children } from 'react'
import { redirect } from "next/navigation";
import { checkRole } from '@/utils/roles';
import DashData from '../ui/dashboard/DashData';




function page() {
  // If the user does not have the admin role, redirect them to the home page
  if (!checkRole("admin")) {
    return redirect("/");
  }
  

  return (
    <div className='bg-slate-100 h-screen '>
       <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-3 xl:grid-cols-4 2xl:gap-7.5 w-full py-10 px-10">
        
        <DashData/>
      </div>
    </div>
  )
}

export default page;