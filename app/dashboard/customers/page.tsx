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
import Image from 'next/image'


function Page() {
const [data,setData] = useState<any>([]);
useEffect(() => {
  axios.get('/api/user').then((res) => setData(res.data)).catch((err) => console.log(err));
},[])



  return (
  <>{data&&(<div className='mx-10'>
  <h2 className='text-2xl underline font-bold mb-10 ml-3'>Users</h2>
    <div className="border-2  rounded-2xl ">
    <Table>
<TableCaption>A list of your recent Bookings.</TableCaption>
<TableHeader>
  <TableRow>
    <TableHead className="w-[100px]">Sl.no</TableHead>
    <TableHead>Name</TableHead>
    <TableHead>Email</TableHead>
    <TableHead>Phone No</TableHead>
    <TableHead>No.s of Rides</TableHead>
    <TableHead>No of Reviews</TableHead>
  </TableRow>
</TableHeader>
<TableBody>
 {data?.map((data:any,i:any) => (
    <TableRow key={i}>
    <TableCell className="font-medium">{i+1}</TableCell>
    <TableCell className='flex items-center justify-start'><Image
                      width={50}
                      height={50}
                      src={data.profile_image_url}
                      alt="driver Image"
                      className="object-cover rounded-full w-12 h-12 p-2"
                    /> <p>{data.first_name}{data.last_name}</p></TableCell>
   
    <TableCell>{data.email}</TableCell>
    <TableCell>{data.phone_number}</TableCell>
    <TableCell>{data?.Bookings?.length}</TableCell>
    <TableCell>{data?.Reviews?.length}</TableCell>
  </TableRow>
 ))}
</TableBody>
</Table>
 
    
  </div>
</div>)}</>
  )
}

export default Page