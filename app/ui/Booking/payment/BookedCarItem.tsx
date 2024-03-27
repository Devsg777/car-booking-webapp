import React from 'react'
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import useBookingData from '@/app/utils/context/useBookingData';
import { Separator } from '@/components/ui/separator';

const BookedCarItem = ({car}:any) => {
const {amountData, carData} = useBookingData()


  return (
    <div >
      {carData&&(<div className=" grid grid-cols-3 gap-5 h-32 border-y-1 border-gray-500 ">
      <Image src={carData?.image as string} width={200} height={200} alt="car" />
        <div>
            <h2 className="font-bold text-[18px]">{car.name}</h2>
           <p className="text-sm">{car.model}</p>
           <div className="flex justify-start items-center gap-1"><IoPerson/>{car.seats}</div>
           <p className="text-sm">{car.description}</p>
        </div>
        <div>
        <h2 className="font-semibold text-[20px]">Rs.{amountData?.amount?.toFixed(0)}</h2>
        <p className="text-sm">{amountData?.distance?.toFixed(0)}Kms</p>
        
        </div>
      </div>)}
      <Separator className="my-2"/>
    </div>     
  )
}

export default BookedCarItem