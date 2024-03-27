import { getDriverById } from '@/actions/getDriverById';
import AddDriverForm from '@/app/ui/dashboard/car/AddDriverForm';
import { auth } from '@clerk/nextjs';
import React from 'react'

interface DriverPageProps{
    params:{
        driverId:string
    }
  }

  
  const page = async({params}:DriverPageProps) => {
    
    const {userId} = auth();
    if(!userId) return <div>Not authenticated...</div>
    const driver = await getDriverById(params.driverId);
      
  return (
    <section className='px-10 py-5'>
    <AddDriverForm driver={driver}/>
</section>
  )
}

export default page