'use client'
import React, { useEffect, useState } from "react";
import CarItem from "./CarItem";
import axios from "axios";
import { Car } from "@prisma/client";


export default function CarSelector() {
  
 const[cars,setCars] = useState<Car[]>([]);
 

 useEffect(() => {
   try{
    const res = axios('/api/cars');
    res.then((data)=>{
      console.log(data.data)
      setCars(data.data)
    })
   }catch(err){
    console.log(err)
   }
   
 },[]);
  return (
    <div className="mr-3">
      <h2 className="mb-4 text-md font-semibold leading-none text-start p-4">
        Recommended
      </h2>
      {cars.map((cab, i) => <CarItem car={cab} key={i} />)}
    </div>
  );
}
