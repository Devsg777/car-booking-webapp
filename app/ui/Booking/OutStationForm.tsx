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
import { IoMdTime } from "react-icons/io";
import AutocompleteInput from "./AutocompleteInput";
import { useRouter } from "next/navigation";
import { Loader2, SearchIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useBookingData from "@/app/utils/context/useBookingData";

const OutStationForm = ()=>{
const router = useRouter();


const {setTripData,setSource,setDestination,reset} = useBookingData();


  //to set time zone
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Kolkata");


  //creating state
  const [isLoading,setLoading] = useState(false);

  const [tripType, setTripType] = useState<string | null>('one-way');
  const [pickUpDateTime, setPickupDateTime] = useState<dayjs.Dayjs | null>(null);
  const [returnDateTime, setReturnDateTime] = useState<dayjs.Dayjs | null>(null);
  const [value, setValue] = useState<any>(null);
  const [value2, setValue2] = useState<any>(null);

  //dateTimePicker state value assigning.
  const handleDateTimeChange = (newDateTime: dayjs.Dayjs | null) => {
    setPickupDateTime(newDateTime);
  };
  const handleReturnDateTimeChange = (newDateTime: dayjs.Dayjs | null) => {
    setReturnDateTime(newDateTime);
  };
  // form handling
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    reset()
    try {
      if (!tripType || !value2 || !value || !pickUpDateTime) {
        toast({variant:'danger',title:'Error',description:'Fill all the fields'});
        setLoading(false);
        return;
      }

      const service = "Out Station";
      const PDT = pickUpDateTime ? pickUpDateTime.toDate() : new Date();
      const RDT = returnDateTime ? returnDateTime.toDate() : null;
  

    
      const ser = new google.maps.places.PlacesService(document.createElement('div'))
      ser.getDetails({ placeId: value.value.place_id },(place,status)=>{
        if(status=='OK' && place?.geometry && place.geometry.location){
          setSource({lat:place.geometry.location.lat(),lng:place.geometry.location.lng(),name:place?.formatted_address||""})
        }
      })
      ser.getDetails({ placeId: value2.value.place_id },(place,status)=>{
        if(status=='OK' && place?.geometry && place.geometry.location){
          console.log(place.formatted_address)
          setDestination({lat:place.geometry.location.lat(),lng:place.geometry.location.lng(),name:place?.formatted_address ||""})
        }

      })
      
      //  send data to the Globel context of redux
 
  const tripData={
    serviceType: service,
    tripType: tripType,
    pickUpLocation: value.label,
    dropOutLocation: value2.label,
    startTime: PDT.toLocaleString(),
    endTime: RDT?.toLocaleString()||null,
    rentalPackage: null,
    airportTaxi: null,
  }
 
       
      setTripData(tripData)
      
      setTripType("");
      setValue2(null);
      setValue(null);
      setPickupDateTime(null);
      setReturnDateTime(null);


      router.push('/booking');
     setLoading(false);
    } catch (err) {
      console.log(err)
      toast({variant:'destructive',title:'Error',description:'Something went wrong'})
    }

  };

  
  return (
    <div>
      <form
        className="relative grid p-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-10 z-[10]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-end ">
          <label className="text-2xl ml-2">
            <TbArrowsExchange />
          </label>

          <div className="flex  items-start bg-transparent w-full dark:text-white  border-b-2 ">
            <div className="flex items-center  ">
              <Radio
                checked={tripType === "one-way"}
                onChange={() => {
                  setTripType("one-way");
                }}
                name="radio-buttons"
              />
              <Label htmlFor="one-way"> One Way</Label>
            </div>
            <div className="flex items-center">
              <Radio
                checked={tripType === "two-way"}
                onChange={() => {
                  setTripType("two-way");
                }}
                name="radio-buttons"
              />
              <Label htmlFor="two-way">Two Way</Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <label
            htmlFor="pickUP"
            className="flex gap-2 items-center text-[12px] sm:text-sm font-semibold "
          >
          <MdLocationPin className="text-xl" />Pickup Location
          </label>
         
          <AutocompleteInput value={value} setValue={setValue}/>
        </div>
        <div className="flex flex-col justify-end">
          <label
            htmlFor="dropOut"
            className="flex gap-2 items-center text-[12px] sm:text-sm font-semibold "
          >
            <MdLocationPin className="text-lg" />
            Drop Location
          </label>
          
          <AutocompleteInput value={value2} setValue={setValue2}/>
        </div>
        <div className="flex flex-col pr-10 gap-2 justify-end">
          <label
            htmlFor="dropOut"
            className="flex gap-2 items-center text-[12px] sm:text-sm font-semibold"
          >
            <IoMdTime className="text-lg" />
            Pickup Time
          </label>
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
         
            <DateTimePicker
              value={pickUpDateTime}
              onChange={(newDateTime) => handleDateTimeChange(newDateTime)}
              disablePast={true}
              className="bg-transparent outline-none h-[40px]  dark:bg-transparent cursor-pointerd dark:text-white"
            />
           
          </LocalizationProvider>
         
        </div>
        {tripType === "two-way" ? (
          <div className="flex flex-col pr-10  ">
            <label
              htmlFor="dropOut"
              className="flex gap-3 justify-start pl-3"
            >
              <IoMdTime className="text-xl" />
              Return Time
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                value={returnDateTime}
                onChange={(newDateTime) =>
                  handleReturnDateTimeChange(newDateTime)
                }
                disablePast={true}
                className="bg-transparent outline-none dark:bg-transparent cursor-pointerd dark:text-white"
              />
            </LocalizationProvider>
          </div>
        ) : (
          <></>
        )}
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
};

export default OutStationForm;
