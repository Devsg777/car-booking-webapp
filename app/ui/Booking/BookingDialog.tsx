'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@clerk/nextjs";
import BookingConfirming from "./BookingConfirming";
import {  useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import useBookingData from "@/app/utils/context/useBookingData";
import { calPrice } from "@/actions/pricings/calPrice";
  

export function BookingDialog({car}:any) {
  const {userId} = useAuth()
  const router = useRouter();
  const [isBookingLoading,setIsBookingLoading] = useState(false);
  const {setCarData,setAmountData,tripData,carData,amountData,paymentIntentId,setPaymentIntentId,setClientSecret} = useBookingData();

  function handleSubmit(){
      setCarData(car); 
     
        if(tripData!==null){
          if(tripData?.rentalPackage==null && amountData?.distance!=null){
            const tot = calPrice(amountData?.distance, car.price);
       
            setAmountData({amount:tot,distance:amountData?.distance})
          }else{
            if(tripData?.rentalPackage =='0-40km'){
              setAmountData({amount:999,distance:40})
      
            }else if(tripData?.rentalPackage =='40-60km'){

              setAmountData({amount:1299,distance:60})
            }else{

              setAmountData({amount:1699,distance:80})
            }
          }
        }
     
      
     
  }

 



const handleBookingSubmit = ()=>{
  
  if(!userId) return toast({
    variant:'danger',
    description:"Please Login",
  })
  if(!carData) return toast({
    variant:'danger',
    description:"Please Select Car",
  })
  if(!amountData) return toast({
    variant:'danger',
    description:"Please Select Distance",
  })

if(tripData && carData && amountData){
  
  setIsBookingLoading(true);
    const bookingCarData= {
    carId: carData.id,
    ...tripData,
    distance:amountData.distance || 0,
    amount: Number(amountData.amount)   || 0,
  }
  console.log(bookingCarData)
  fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({booking:{
      ...bookingCarData,
    },
    paymentIntentID:paymentIntentId
    
  }),

  }).then((res)=>{
    
    if(res.status ===401){
       router.push('/api/sign-in');
    }
    return res.json();
    
  }).then((data)=>{
    console.log(data)
    if(!data.client_secret || !data.id || !data) {
      toast({
        variant:'danger',
        description:`Error ${data.message} `,
      })
      setIsBookingLoading(false);
      return
    }

 setPaymentIntentId(data.id);
 setClientSecret(data.client_secret)
    router.push('/booking/payment');
    setIsBookingLoading(false);
  }).catch((error:any)=>{
    console.log(error)
    setIsBookingLoading(false);
    toast({
      variant:'danger',
      description:`Error ${error} `,
    })
  })
}else{
  
  toast({
    variant:'danger',
    description:"Opps fill all data first",
  })
}
}
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline"  className="mt-3 bg-emerald-500 text-white w-[80%] h-8 rounded-sm flex justify-center items-center active:scale-105 hover:bg-emerald-400" onClick={()=>{handleSubmit()}}>Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Confirm Your Booking</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>

        <BookingConfirming/>

        <DialogFooter>
          <Button type="submit" className="bg-emerald-500 text-white w-32" onClick={()=>{handleBookingSubmit()}}  >{isBookingLoading?<><Loader2 className="mr-2 h-4 w-4 animate-spin"/></>:<>Confirm</>}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
function useEffect(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}

