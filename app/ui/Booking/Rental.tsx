"use client";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MdLocationPin } from "react-icons/md";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GiSpeedometer } from "react-icons/gi";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { IoMdTime } from "react-icons/io";
import { useRouter } from "next/navigation";
import AutocompleteInput from "./AutocompleteInput";
import { Loader2, SearchIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import useBookingData from "@/app/utils/context/useBookingData";


const Rental = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Kolkata");
 
  const router = useRouter()
  //globel initialzier



  //creating state
  const [showError, setShowError] = useState(false);
  const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(null);
  const [packageType, setPackageType] = useState('');
 const {setSource,setDestination,setTripData,reset,setAmountData} = useBookingData();
  const [isLoading,setLoading] = useState(false);

 const [value, setValue] = useState<any>(null);
  //dateTimePicker state value assigning.
  const handleDateTimeChange = (newDateTime: dayjs.Dayjs | null) => {
    setDateTime(newDateTime);
  };

  // form handling
  const handleSubmit = (e: any) => {
    setLoading(true);
    e.preventDefault();
    reset();
    try {
      if (!packageType || !value || !dateTime ) {
        toast({
          variant:'danger',
          title: "Error",
          description: "Please enter all the fields",
        })
      setLoading(false);
        return
      }

  
      const ser = new google.maps.places.PlacesService(document.createElement('div'))
      ser.getDetails({ placeId: value.value.place_id },(place,status)=>{
        if(status=='OK' && place?.geometry && place.geometry.location){
          console.log(place.geometry.location.lng())
          setSource({lat:place.geometry.location.lat(),lng:place.geometry.location.lng(),name:place?.formatted_address||""})
          // setDestination({lat:place.geometry.location.lat(),lng:place.geometry.location.lng(),name:place?.formatted_address||""})
        }

      })
      
      

    const service = "Rental";
    const date = dateTime ? dateTime.toDate() : new Date();

   
    if(packageType=='0-40km'){
      setAmountData({amount:999,distance:40})
    }else if(packageType=='40-60km'){
      setAmountData({amount:1299,distance:60})
    }else{
      setAmountData({amount:1699,distance:80})
    }

  setTripData(
    {
      serviceType: service,
      tripType: null,
      pickUpLocation: value.label,
      dropOutLocation: null,
      startTime: date.toLocaleString(),
      endTime: null,
      rentalPackage: packageType,
      airportTaxi: null,

    }
  )
    setDateTime(null);
    setPackageType('');


    setLoading(false);
    router.push('/booking')
  } catch (err) {
    console.log(err);
    toast({
      variant:'danger',
      title: "Error",
      description: "Please enter all the fields",
    })
  }
  };


  return (
    <div>
      <form
        className="relative grid px-10 pt-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 pb-10 z-[10]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-end ">
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
            htmlFor="pickUP"
            className="flex gap-2 items-center text-sm font-semibold"
          >
            <IoMdTime className="text-xl" /> Pickup Time
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dateTime}
              onChange={(newDateTime) => handleDateTimeChange(newDateTime)}
              disablePast={true}
              className="bg-transparent outline-none h-[40px]  dark:bg-transparent cursor-pointerd dark:text-white"
            />
          </LocalizationProvider>
        </div>
        <div className="flex flex-col justify-end ">
          <label
            htmlFor="pickUP"
            className="flex gap-2 items-center text-sm font-semibold"
          >
            <GiSpeedometer className="text-xl" />
            Select Package
          </label>
          <Box sx={{ minWidth: 120, height:'40px',border:'none',padding:'0px' }}>
            <FormControl fullWidth  >
              <InputLabel id="packageTypeLabel">Package</InputLabel>
              <Select
              
                labelId="packageTypeLabel"
                id="packageType"
                value={packageType}
                label="Package"
                aria-label="Select Package"
                onChange={(e: SelectChangeEvent) => {
                  setPackageType(e.target.value);
                }}
                className="h-10 border-none flex justify-center outline-none bg-slate-50 box-border"
              >
                <MenuItem value={"0-40km"}>Short [0-40km]</MenuItem>
                <MenuItem value={"40-60km"}>Medium [40-60km]</MenuItem>
                <MenuItem value={"60-80km"}>Long [60-80km]</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="absolute -bottom-6 w-full flex justify-center">
            <button
              className="bg-emerald-500 text-white   w-40  h-10  rounded-xl  flex justify-center items-center gap-2 active:scale-105 hover:bg-emerald-400"
              type="submit"
            >
              {isLoading?<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>{"  "} Loading</>:<><SearchIcon/>{"  "} Search Car</>}
            </button>
        </div>
      </form>
    </div>
  );
};

export default Rental;
