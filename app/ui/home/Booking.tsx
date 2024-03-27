import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaRoute } from "react-icons/fa";
import { GiCarKey } from "react-icons/gi";
import { MdEmojiTransportation } from "react-icons/md";
import { FaTruckPlane } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import OutStationForm from "../Booking/OutStationForm";
import Rental from "../Booking/Rental";
import AirportForm from "../Booking/AirportForm";
import CityRideForm from "../Booking/CityRideForm";
import GlassEffect from "./GlassEffect";

function Booking() {
  return (
    <div className=" relative border shadow-md  px-6 md:px-8 rounded-2xl bg-gradient-to-tr from-gray-100 to-gray-200 dark:from-gray-900 ">
      
      <div className="w-full ">
        <Tabs defaultValue="out-sation" className="border-emerald-100 " >
          <TabsList className="z-[10] flex justify-between max-w-[50%] min-w-fit h-10 m-auto text-black border-emerald-100 ">
            <TabsTrigger value="out-sation" className="z-[10] border-x-2 border-emerald-300 rounded-none w-full" >
              <div className="flex justify-center items-center gap-2">
                <FaRoute className="text-xl" />
                Outsation
              </div>
            </TabsTrigger>
            <TabsTrigger value="rental" className=" border-x-2 z-[10]  border-emerald-300 rounded-none w-full">
              <div className=" flex justify-center items-center gap-2">
                <GiCarKey className="text-xl" />
                Rental
              </div>
            </TabsTrigger>
            <TabsTrigger value="airport-transfer" className="border-x-2 z-[10] border-emerald-300 rounded-none w-full">
              <div className="flex justify-center items-center gap-2">
                <FaTruckPlane className="text-xl" />
                Airport
              </div>
            </TabsTrigger>
            <TabsTrigger value="city-ride" className="border-x-2 z-[10] border-emerald-300 rounded-none w-full">
              <div className="flex justify-center items-center gap-2  h-full w-full ">
                <MdEmojiTransportation className="text-xl" />
                City ride
              </div>
            </TabsTrigger>
          </TabsList>
          <Separator className="flex justify-center gap-3  w-[50%] m-auto mt-2" />
          <TabsContent value="out-sation" className=""><OutStationForm/></TabsContent>
          <TabsContent value="rental"><Rental/></TabsContent>
          <TabsContent value="airport-transfer"><AirportForm/></TabsContent>
          <TabsContent value="city-ride"><CityRideForm/></TabsContent>
        </Tabs>
      </div>
      <GlassEffect/>
    </div>
  );
}

export default Booking;
