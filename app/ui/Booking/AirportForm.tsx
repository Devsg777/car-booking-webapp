"use client";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MdLocationPin } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { TbArrowsExchange } from "react-icons/tb";
import Radio from "@mui/material/Radio";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useRouter } from "next/navigation";
import AutocompleteInput from "./AutocompleteInput";
import { Loader2, SearchIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useBookingData from "@/app/utils/context/useBookingData";

const AirportForm = () => {
const {setSource,setDestination,setTripData,reset} = useBookingData();

 


    //to set time zone
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Kolkata");
  
    //globel initialzier
    const router = useRouter()
    //creating state
    const [isLoading,setLoading] = useState(false);

    const [value, setValue] = useState<any>(null);
    const [value2, setValue2] = useState<any>(null);
    const [tripType, setTripType] = useState("from-airport");
    const [pickUpDateTime, setPickupDateTime] = useState<dayjs.Dayjs | null>(null);
  
    //dateTimePicker state value assigning.
    const handleDateTimeChange = (newDateTime: dayjs.Dayjs | null) => {
      setPickupDateTime(newDateTime);
    };
    
    // form handling
    const handleSubmit = (e: any) => {
      setLoading(true);
      e.preventDefault();
      reset();
      try {
        if (!value || !value2 ||!pickUpDateTime) {
          toast({variant:'danger',title:'Error',description:'Fill all the fields'});
          setLoading(false);
          return;
        }
      const service = "AirportTaxi";
      const PDT = pickUpDateTime ? pickUpDateTime.toDate() : new Date();
      
      
  
      const ser = new google.maps.places.PlacesService(document.createElement('div'))
      ser.getDetails({ placeId: value.value.place_id },(place,status)=>{
        if(status=='OK' && place?.geometry && place.geometry.location){
          console.log(place.geometry.location.lng())
          setSource({lat:place.geometry.location.lat(),lng:place.geometry.location.lng(),name:place?.formatted_address||""})
        
        }

      })
      ser.getDetails({ placeId: value2.value.place_id },(place,status)=>{
        if(status=='OK' && place?.geometry && place.geometry.location){
          console.log(place.formatted_address)
          setDestination({lat:place.geometry.location.lat(),lng:place.geometry.location.lng(),name:place?.formatted_address||""})
        }


      })
      //  send data to the Globel context of redux
  
    
     setTripData({
      serviceType: service,
      tripType: tripType,
      pickUpLocation: value.label,
      dropOutLocation: value2.label,
      startTime: PDT.toLocaleString(),
      endTime: null,
      rentalPackage: null,
      airportTaxi: tripType,
     })
      setTripType("");
      setPickupDateTime(null);
      
      setLoading(false);
      router.push('/booking');

    } catch (err) {
      console.log(err);
    }
    };
    return (
      <div>
        <form
          className="relative grid p-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-10 z-[10]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col justify-end  ">
            <label className="text-2xl">
              <TbArrowsExchange />
            </label>
  
            <div className="flex  items-start  bg-transparent w-full  dark:text-white border-b-2 ">
              <div className="flex items-center space-x-2 ">
                <Radio
                  checked={tripType === "from-airport"}
                  onChange={() => {
                    setTripType("from-airport");
                  }}
                  name="radio-buttons"
            
                />
                <Label htmlFor="one-way">To Airport</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio
                  checked={tripType === "to-airport"}
                  onChange={() => {
                    setTripType("to-airport");
                  }}
                  name="radio-buttons"
                  
                />
                <Label htmlFor="two-way">From Airport</Label>
              </div>
            </div>
          </div>
       {tripType==="from-airport"?<>   <div className="flex flex-col justify-end">
            <label
              htmlFor="pickUP"
              className="flex gap-2 items-center text-sm font-semibold"
            >
              <FaPlaneDeparture className="text-xl" />Airport Location
            </label>
            {/* <input
              type="text"
              id="pickUp"
              className="h-12 rounded-lg p-5"
              placeholder="Mysuru"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            /> */}
            <AutocompleteInput value={value} setValue={setValue}/>
          </div>
          <div className="flex flex-col justify-end">
            <label
              htmlFor="dropOut"
              className="flex gap-2 items-center text-sm font-semibold"
            >
              <MdLocationPin />
              Drop Location
            </label>
            <AutocompleteInput value={value2} setValue={setValue2}/>
          </div>
          <div className="flex flex-col justify-end ">
            <label
              htmlFor="dropOut"
              className="flex gap-2 items-center text-sm font-semibold"
            >
              <IoMdTime className="text-2xl" />
              Pickup Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={pickUpDateTime}
                onChange={(newDateTime) => handleDateTimeChange(newDateTime)}
                disablePast={true}
                className="bg-transparent outline-none h-[40px]  dark:bg-transparent cursor-pointerd dark:text-white"
              />
            </LocalizationProvider>
          </div></>:<>   <div className="flex flex-col justify-end">
            <label
              htmlFor="pickUP"
              className="flex gap-2 items-center text-sm font-semibold"
            >
              <MdLocationPin className="text-xl" /> Pickup Location
            </label>
            <AutocompleteInput value={value} setValue={setValue}/>
          </div>
          <div className="flex flex-col justify-end ">
            <label
              htmlFor="dropOut"
              className="flex gap-2 items-center text-sm font-semibold"
            >
              <FaPlaneArrival />
              Airport Location
            </label>
            <AutocompleteInput value={value2} setValue={setValue2}/>
          </div>
          <div className="flex flex-col justify-end">
            <label
              htmlFor="dropOut"
              className="flex gap-2 items-center text-sm font-semibold"
            >
              <IoMdTime className="text-2xl"/>
              Pickup Date
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={pickUpDateTime}
                onChange={(newDateTime) => handleDateTimeChange(newDateTime)}
                disablePast={true}
                slotProps={{
                  textField: {
                    color: 'primary',
                    className:"dark:text-white"
                  }
                }}
                className="bg-transparent outline-none h-[40px]  dark:bg-transparent cursor-pointerd dark:text-white"
              />
            </LocalizationProvider>
          </div></>}
         
                
          <div className="absolute -bottom-6 w-full flex justify-center">
            <button
              className="bg-emerald-500 text-white  w-40  h-10  rounded-xl  flex justify-center items-center active:scale-105 hover:bg-emerald-400"
              type="submit"
            >
              {isLoading?<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>{"  "} Loading</>:<><SearchIcon/>{"  "} Search Car</>}
            </button>
        </div>
        </form>
      </div>
    );
}

export default AirportForm