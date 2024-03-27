import { getCarById } from '@/actions/getCarById'
import AddCarForm from '@/app/ui/dashboard/car/AddCarForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

interface CarPageProps{
    params:{
        carId:string
    }
}

const page = async({params}:CarPageProps) => {
    const car = await getCarById(params.carId);
    console.log(car)
    const {userId} = auth();
    if(!userId) return <div>Not authenticated...</div>
    
  return (
    <section className='px-10 py-5'>
        <AddCarForm car={car}/>
    </section>
  )
}

export default page