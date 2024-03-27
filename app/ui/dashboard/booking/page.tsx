'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios';
import { MdCurrencyRupee } from 'react-icons/md';
import clsx from 'clsx';
import Link from 'next/link';


function Page() {
const [data,setData] = useState<any>([]);
useEffect(() => {
  axios.get('/api/bookings').then((res) => setData(res.data)).catch((err) => console.log(err));
},[])
console.log(data)

  return (
  <>{data&&(<div className='mx-10'>
  <h2 className='text-2xl underline font-bold mb-10'>Bookings</h2>
    <div className="border-2  rounded-2xl ">
    <Table>
<TableCaption>A list of your recent Bookings.</TableCaption>
<TableHeader>
  <TableRow>
    <TableHead className="w-[10px]">Sl.no</TableHead>
    <TableHead>Status</TableHead>
    <TableHead>Date</TableHead>
    <TableHead>From Location</TableHead>
    <TableHead>To Location</TableHead>
    <TableHead>Service</TableHead>
    <TableHead>payment Status</TableHead>
    <TableHead className="text-right">Amount</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
 {data?.map((booking:any,i:any) => (
    <TableRow key={i}>
    <TableCell className="font-medium">{i+1}</TableCell>
    <TableCell ><Link href={`/dashboard/bookings/${booking.id}`}><p className={clsx(
        'flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-600 text-white': booking.status === 'Pending',
          'bg-green-500 text-white': booking.status === 'Confirmed',
          'bg-red-500 text-white': booking.status === 'Cancelled',
          "bg-yellow-300 text-black": booking.status === "ToCancel",
        },
      )}>{booking.status}</p></Link></TableCell>
    <TableCell>{booking.startTime}</TableCell>
    <TableCell>{booking.pickUpLocation}</TableCell>
    <TableCell>{booking.dropOutLocation}</TableCell>
    <TableCell>{booking.serviceType}</TableCell>
    <TableCell><p className={clsx(
        'flex items-center rounded-full text-center px-2 py-1 text-sm',
        {
          'bg-green-500 text-white': booking.paymentstatus===true,
          'bg-red-500 text-white': booking.paymentstatus ===false,
        },
      )}>{booking.paymentstatus?"Paid":"Unpaid"}</p></TableCell>
    <TableCell ><div className="text-lg flex items-center gap-1 h-full "><MdCurrencyRupee/>{booking.amount}</div></TableCell>
  </TableRow>
 ))}
</TableBody>
</Table>

    
  </div>
</div>)}</>
  )
}

export default Page