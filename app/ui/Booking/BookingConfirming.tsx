import { Calendar, PinIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator';

import { IoIosPin } from 'react-icons/io';
import { MdCurrencyRupee,  MdPerson } from 'react-icons/md';

import useBookingData from '@/app/utils/context/useBookingData';
import { addMinutes } from 'date-fns';



const BookingConfirming = () => {
const {tripData,amountData,carData} = useBookingData();
const [waitingTime,setWaitingTime] = useState<Date>();
console.log("confirming>>>>>",amountData)
 useEffect(()=>{
  if(tripData?.startTime){

    setWaitingTime(addMinutes(new Date(tripData?.startTime),15));
  }
 },[tripData?.startTime])
 
  return (
    <div>
        <div className='p-3 w-full max-h-[70vh]'>
        <div className='flex justify-between'><div><h2 className='text-xl font-semibold '>Reserving your ride</h2>
         <p className='text-sm mb-3'> You choose <span className='text-sm font-semibold text-emerald-500'>{tripData?.serviceType}</span> Service<br/>({tripData?.tripType}).</p>
         {/* <p className='bg-black text-white max-w-fit px-2 text-sm rounded-xl'>Car Reserved</p> */}
         <h2 className='text-2xl font-semibold flex gap-1 items-center'><MdCurrencyRupee/>{amountData?.amount?.toFixed(0)}</h2>
         <p className='text-sm'>({amountData?.distance?.toFixed(1)}) Km</p>
         <div className='flex gap-4 font-semibold '><p>{carData?.name}</p><p className='flex items-center'><MdPerson/>{carData?.seats}</p></div>
         </div>
          <Image src={carData?.image ? carData.image:'/car.png'} width={200} height={200} className='rounded-xl w-60 h-auto'  alt="car Image"/>
        </div>
        <Separator className='h-[2px] w-[95%] m-auto'/>
        <div className='p-7 flex flex-col gap-3'>
          <div className='flex gap-5 items-center '>
            <Calendar  size={35}/>
            <div><h3 className='font-medium'>{tripData?.startTime?.toLocaleString()}</h3>
            {tripData?.endTime &&(<h3 className='text-sm font-light'>Return Date {tripData?.endTime?.toLocaleString()}</h3>)}
            <p className='text-sm'>(Your driver will wait until {waitingTime?.toLocaleTimeString()})</p></div>
          </div>
          <div className='flex gap-5  items-center'>
            <IoIosPin className='text-4xl'/>
            <h3 className='font-medium'>{tripData?.pickUpLocation}</h3>
          </div>
          <div className='flex gap-5  items-center'>
            <IoIosPin className='text-4xl'/>
            <h3 className='font-medium'>{tripData?.dropOutLocation}</h3>
          </div>
          {/* <div className='flex gap-5'>
          <MdOutlinePayments className='text-4xl'/>
            <div className='flex'><h3>Hassan Karnataka</h3>
            <p>cash</p></div>
          </div> */}
          <p className='text-sm '>You&apos;ll see driver and car details shortly before you pickup.</p>
        </div>
    
    </div>
    </div>
  )
}

export default BookingConfirming