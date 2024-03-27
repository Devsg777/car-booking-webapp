'use client'
import { Calendar, CalendarRange, PinIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Separator } from '@/components/ui/separator';
import { IoIosPin } from 'react-icons/io';
import { MdOutlinePayments } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import useBookingData from '@/app/utils/context/useBookingData';
import { IoAirplane, IoSpeedometerOutline } from "react-icons/io5";
import Link from 'next/link';



const BookingConfirmed = () => {
  const { tripData, carData, amountData, paymentIntentId } = useBookingData();


  return (
    <div className='p-3 w-full'>
      <div className='flex justify-between'><div><h2 className='text-xl font-semibold '>Thank You for reserving your ride</h2>
        <p className='text-lg mb-3'> You choose <span className='text-lg font-semibold text-emerald-500'>{tripData?.serviceType}</span> Service.</p>
        <p className='bg-black text-white max-w-fit px-2 text-sm rounded-xl'>Car Reserved</p>
        <p className='text-lg p-3 font-medium'>{carData?.name}</p>
        </div>
        <Image src={carData?.image ? carData?.image : '/cars.png'} width={200} height={100} alt="car Image" />
      </div>
      <Separator className='h-[2px] w-[95%] m-auto' />
      <div className='p-7 flex flex-col gap-3'>
        <div className='flex gap-5'>
          <Calendar size={35} />
          <h3>{tripData?.startTime}</h3>
        </div>
        {tripData?.endTime && <div className='flex gap-5'>
          <CalendarRange size={35} />
          <h3>{tripData?.endTime}</h3>
        </div>}
        <div className='flex gap-5'>
          {tripData?.airportTaxi =="from-airport"?<IoAirplane className='text-4xl'/>:<IoIosPin className='text-4xl' />}
          <h3>{tripData?.pickUpLocation}</h3>
        </div>
       {tripData?.dropOutLocation&&( <div className='flex gap-5'>
       {tripData?.airportTaxi =="to-airport"?<IoAirplane className='text-4xl'/>:<IoIosPin className='text-4xl' />}
          <h3>{tripData?.dropOutLocation}</h3>
        </div>)
       }{tripData?.rentalPackage&&(
        <div className='flex gap-5'>
          <IoSpeedometerOutline/>
          <h3>{tripData?.rentalPackage}</h3>
          </div>
       )}
       <div className='flex gap-5 '>
          <MdOutlinePayments className='text-4xl'/>
          <div><h3 className='font-semibold text-2xl '>{amountData?.amount} Rs</h3>
          <p className='text-sm '>for {amountData?.distance}Kms</p></div>
        </div>
        <p className=' mt-5'>You&apos;ll recive call from our staff please confirm your booking.</p>
        <p className='text-sm'>You&apos;ll see driver and car details shortly before you pickup.</p>
      </div>
     <div className="flex flex-col gap-3"> <Button className="bg-gray-300 text-black rounded-xl w-[90%] mx-10 hover:text-white">Cancle Trip</Button>
      <Button  asChild className="bg-emerald-500 text-black rounded-xl w-[90%] mx-10 hover:text-white"><Link href={'/mybookings'}>Your Trips</Link></Button></div>
    </div>
  )
}

export default BookingConfirmed;