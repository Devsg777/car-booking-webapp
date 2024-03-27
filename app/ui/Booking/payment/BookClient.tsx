'use client'
import React, { useState } from 'react'
import {loadStripe, StripeElementsOptions}  from "@stripe/stripe-js"
import useBookingData from '@/app/utils/context/useBookingData'
import BookedCarItem from './BookedCarItem';
import {Elements} from '@stripe/react-stripe-js';
import CarPaymentForm from './CarPaymentForm';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)




const BookClient = () => {

  
 const {tripData,carData,clientSecret} = useBookingData();
 const [pageLoaded,setPageLoaded] = useState(false);
 const [paymentSucess, SetPaymentSucess] = useState(false);

 const options: StripeElementsOptions= {
   clientSecret:clientSecret,
   appearance: {
     theme: "stripe",
     labels: "floating",

   }

 }

 const handlePaymentSuccess = (value:boolean)=>{
  SetPaymentSucess(value);
 }

  return (
    <div className='mx-auto w-ful'>
       {clientSecret && tripData&&<div className='m-6 flex flex-col gap-5'>
          <h3 className='text-xl font-semibold '>Complete Payment to Resrve this Car!</h3>
          <div>
            <BookedCarItem car={carData}/>
          </div>
          <Elements options={options} stripe={stripePromise} >
           <CarPaymentForm onSuccess={handlePaymentSuccess} clientSecret={clientSecret}/>
            </Elements>
       </div>}
    </div>
  )
}

export default BookClient;