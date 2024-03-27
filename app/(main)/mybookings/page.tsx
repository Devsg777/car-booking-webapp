"use client";
import ReviewsForm from "@/app/ui/Reviews/ReviewsForm";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
 const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    try {
      const res = axios
        .get("/api/booking")
        .then((res) => setBookings(res.data))
        .catch((err) => console.log(err));
   
    } catch (err: any) {
      console.log(err);
    }
  },[]);
  console.log(bookings)

  return (
    <div className="px-3 lg:px-20 py-10 min-h-screen m-20">
      <div className="flex justify-end ">
        <Button asChild className="bg-gray-300 border-black text-black hover:text-white mr-3">
          <Link href={'/'}>Home</Link>
        </Button>
        <Button  asChild className="bg-black text-white " ><Link href={'/contact'}>Contact us</Link></Button>
      </div>
      <div>
        <h1 className="text-3xl font-[400] ">Upcoming</h1>
        <p className="text-sm pl-2">Your Trips</p>
      </div>
      <div className="flex flex-col md:grid lg:grid grid-cols-2 md:gap-5 lg:gap-10 min-h-[50vh]">
        
        {bookings?.map((booking, i) => (
          <div key={i} className="flex gap-2 md:gap-5 lg:gap-10 justify-around border-2 border-black rounded-xl h-48 pr-2  ">
          <Image src={booking?.car.image ? booking?.car.image : '/cars.png'} width={200} height={100} alt="car Image" />
          <div className="flex flex-col justify-between py-3">
            <div>
              <p className="text-lg">{booking.status}</p>
              <p className="text-sm">{booking.pickUpLocation}</p>
              <p className="text-sm">{booking.startTime}</p>
            </div>
            <Button asChild className="bg-gray-400 border-black text-black hover:text-white">
              <Link href={`/mybookings/${booking?.id}`}>Trip Details</Link>
            </Button>
          </div>
        </div>
        ))}
      </div>
     <div>
        <h1 className="text-3xl font-[400] ">Add Your  Review Here</h1>
        <div><ReviewsForm review={null}/></div>
     </div>
    </div>
  );
};

export default Page;
