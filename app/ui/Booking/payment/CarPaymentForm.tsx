import useBookingData from "@/app/utils/context/useBookingData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

interface CarPaymentProps {
  clientSecret: string;
  onSuccess: (value: boolean) => void;
}
const CarPaymentForm = ({ clientSecret, onSuccess }: CarPaymentProps) => {
  const { tripData, reset, amountData } = useBookingData();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const Router = useRouter();

  useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    
    onSuccess(false);
    setIsLoading(false);

  }, [stripe, clientSecret, elements, toast, onSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();
    

    setIsLoading(true);
    if (!stripe || !elements) {
     
      return;
    }
    try {
      stripe
        .confirmPayment({
          elements,
          redirect: "if_required",
          confirmParams: {
            
          }
        })
        .then((result) => {
          if (!result.error) {
            console.log("running");
            axios
              .patch(`/api/bookings/${result.paymentIntent.id}`)
              .then((res) => {
                toast({
                  variant: "success",
                  description: "🎉 Payment Successfull",
                });
                Router.push("/booking/payment/confirmed");
                onSuccess(true);
                setIsLoading(false);
              })
              .catch((err) => {
                toast({
                  variant: "destructive",
                  description: err.message,
                });
                setIsLoading(false);
              });
          } else {
            setIsLoading(false);
            console.log(result.error.message);
            toast({
              variant: "destructive",
              description: result.error.message,
            })
          }
        });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="font-semibold text-lg">Billing Address</h2>
      <AddressElement
        options={{
          mode: "billing",
          allowedCountries: [],
        }}
      />
      <h2 className="font-semibold text-lg mt-4 mb-2 ">Payment Information</h2>
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg mb-1">Your Booking Summary</h2>
        <div>You will Get at {tripData?.pickUpLocation}</div>
      </div>
      <Separator className="my-2" />
      <div className="font-bold">
        Total Amount: Rs.{amountData?.amount?.toFixed(0)}
      </div>
      <Separator className="my-2" />
      {isLoading && (
        <Alert variant={'default'}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Payment Proceesing ...</AlertTitle>
          <AlertDescription>
            Please Stay on this page until the payment is complete.
          </AlertDescription>
        </Alert>
      )}
      <Button disabled={isLoading} className="w-full" type="submit">
        {isLoading ? "Processing Payment..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default CarPaymentForm;
