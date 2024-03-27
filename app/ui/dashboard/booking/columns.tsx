"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import clsx from "clsx"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { BsArrowsFullscreen } from "react-icons/bs";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Bookings = {
  id: string
  status:"Confirmed" | "Pending" | "Cancelled"
  pickUpLocation: string
  dropOutLocation: string
  serviceType: string
  startTime: string
  endTime: string
  email: string
  phoneNumber: string
  amount: number
  paymentstatus: "paid" |"Unpaid"
  paymentId: string
}

export const columns: ColumnDef<Bookings>[] = [
 {
   accessorKey: "id",
   header: "Action",
   cell: ({ row }) => {
     return <Link href={`/dashboard/bookings/${row.getValue("id")}`}><BsArrowsFullscreen className="h-4 w-4"/></Link>
   }
 },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("status")
      return <div>
      <p className={clsx(
        'flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-600 text-white': status === 'Pending',
          'bg-green-500 text-white': status === 'Confirmed',
          'bg-red-500 text-white':status === 'Cancelled',
          'bg-yellow-300 text-black':status === 'ToCancel',
          
        },
      )}>{status as string}</p>
      </div>
    }
  },
  {
    accessorKey: "serviceType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Service Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pick Up Time
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "pickUpLocation",
    header: "Pick Up Location",
  },
  {
    accessorKey: "dropOutLocation",
    header: "Drop Out Location",
  },
  
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount)
 
      return <div className="text-right font-bold ">{formatted}</div>
    },
  },
  {
    accessorKey: "paymentstatus",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = row.getValue("paymentstatus")
      return <div>
        {status?<><p className="flex items-center rounded-full px-3 py-1 text-sm bg-green-500 text-white " >Paid</p></>:<><p className="flex items-center rounded-full px-3 py-1 text-sm bg-red-500 text-white ">Unpaid</p></>}
      </div>
    }
  },
]
