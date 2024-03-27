'use client'
import { useEffect, useState } from "react";
import { Bookings, columns } from "./columns"
import { DataTable } from "./Data-table"
import axios from "axios";

async function GetData(): Promise<Bookings[]> {
  // Fetch data from your API here.

const [data,setData] = useState<any>([]);
useEffect(() => {
  axios.get('/api/bookings').then((res) => setData(res.data)).catch((err) => console.log(err));
},[])
  return data
}

export default async function BookingDataTable() {
  const data = await GetData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
