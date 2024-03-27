'use client'
import { Calendar, CalendarRange, Loader2, PinIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator';
import { IoIosPin } from 'react-icons/io';
import { MdOutlinePayments } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { IoAirplane, IoSpeedometerOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
import Link from 'next/link';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';




const Bookingpage = ({params:{bookingId}}:{params:{bookingId:string}}) => {
const [data,setData] = useState<any>({} as any);
const [delLoading,setDelLoading] = useState(false);

  useEffect(()=>{
  
    axios.get(`/api/booking/${bookingId}`).then((res)=>{
      
      setData(res.data);
      
    }).catch((err)=>{
      console.log(err);
    })
    return () => {
      // Cleanup logic (if needed)
    };
  },[])

  function handleCancleRequest(event: React.MouseEvent<HTMLButtonElement>): void {
    setDelLoading(true)
    event.preventDefault();
    axios
      .patch(`/api/booking/${bookingId}`, { status: "ToCancel" })
      .then((res) => {
        toast({
          variant: "success",
          description: "Booking Request Cancel",
        })
        setDelLoading(false)
      })
      .catch((err) => {
        console.log(err);
        toast({
          variant: "destructive",
          description: "Something went wrong",
        })
        setDelLoading(false)
      });
  }

  return (
    <>
    {data?.car &&(<div className='px-3 lg:px-20 py-10  '>
    <div className="flex justify-end ">
        <Button asChild className="bg-gray-300 border-black text-black hover:text-white mr-3">
          <Link href={'/'}>Home</Link>
        </Button>
        <Button  asChild className="bg-black text-white " ><Link href={'/contact'}>Contact us</Link></Button>
      </div>
    <div className='flex justify-between'><div><h2 className='text-xl font-semibold '>Thank You for reserving your ride</h2>
      <p className='text-lg mb-3'> You choose <span className='text-lg font-semibold text-emerald-500'>{data?.serviceType}</span> Service.</p>
      <p className='bg-black text-white max-w-fit px-2 text-sm rounded-xl'>Car Reserved</p>
      <p className='text-lg p-3 font-medium'>{data.car.name}</p>
      </div>
      <Image src={data.car.image? data.car.image : '/cars.png'} width={200} height={100} alt="car Image" />
    </div>
    <Separator className='h-[2px] w-[95%] m-auto' />
    <div className='p-7 flex flex-col gap-3'>
      <div className='flex gap-5'>
        <Calendar size={35} />
        <h3>{data?.startTime}</h3>
      </div>
      {data?.endTime && <div className='flex gap-5'>
        <CalendarRange size={35} />
        <h3>{data?.endTime}</h3>
      </div>}
      <div className='flex gap-5'>
        {data?.airportTaxi =="from-airport"?<IoAirplane className='text-4xl'/>:<IoIosPin className='text-4xl' />}
        <h3>{data?.pickUpLocation}</h3>
      </div>
     {data?.dropOutLocation&&( <div className='flex gap-5'>
     {data?.airportTaxi =="to-airport"?<IoAirplane className='text-4xl'/>:<IoIosPin className='text-4xl' />}
        <h3>{data?.dropOutLocation}</h3>
      </div>)
     }{data?.rentalPackage&&(
      <div className='flex gap-5'>
        <IoSpeedometerOutline/>
        <h3>{data?.rentalPackage}</h3>
        </div>
     )}
     <div className='flex gap-5 '>
        <MdOutlinePayments className='text-4xl'/>
        <div><h3 className='font-semibold text-2xl '>{data?.amount} Rs</h3>
        <p className='text-sm '>for {data?.distance}Kms</p></div>
      </div>
      <div className='flex gap-5 '>
        <FaRegAddressCard className='text-4xl'/>
        <div><h3 className=''>Driver: {data?.car.driver.name}</h3>
        <p className='text-sm '></p>Phone Number: +91 {data.car.driver.phoneNumber}</div>
      </div>
      <p className=' mt-5'>You&apos;ll recive call from our staff please confirm your booking.</p>
      <p className='text-sm'>You&apos;ll see driver and car details shortly before you pickup.</p>
    </div>
   <div className="flex flex-col gap-3"><Button onClick={handleCancleRequest} className="bg-gray-300 text-black rounded-xl w-[90%] mx-10 hover:text-white">{delLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Cancelling</> : "Cancel Request"}</Button>
    <Button  asChild className="bg-emerald-500 text-black rounded-xl w-[90%] mx-10 hover:text-white"><Link href={'/mybookings'}>Your Trips</Link></Button></div>
  </div>)}
    </>
  )
}

export default Bookingpage;