import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { BookingDialog } from "./BookingDialog";
import { Separator } from "@/components/ui/separator";
import useBookingData from "@/app/utils/context/useBookingData";
import { useState } from "react";


const CarItem = ({car}:any) => {
  const {tripData,amountData,setAmountData} = useBookingData();
  console.log("car Items>>>>>",amountData);
  
   
 
  

  return (
    <div key={car.id}>
      <div className=" grid grid-cols-3 gap-5 h-32 border-y-1 border-gray-500 ">
      <Image src={car.image} width={200} height={200} alt="car" />
        <div>
            <h2 className="font-bold text-[18px]">{car.name}</h2>
           <p className="text-sm">{car.model}</p>
           <div className="flex justify-start items-center gap-1"><IoPerson/>{car.seats}</div>
           <p className="text-sm">{car.description}</p>
        </div>
        <div>
        <h2 className="font-semibold text-[20px]">Rs.{amountData?.amount===0?car.price:amountData?.amount} <span className=" font-medium text-sm">per Km</span></h2>
        <p className="text-sm"> {amountData?.distance?.toFixed(0)}Kms</p>
        <BookingDialog car={car}/>
        </div>
      </div>
      <Separator className="my-2"/>
    </div>                           
  );
};

export default CarItem;