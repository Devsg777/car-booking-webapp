"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { DialogFooter } from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  status: z
    .string({
      required_error: "Please select an status.",
    })
    .min(1, { message: "Please select an status." }),
});

export function BookingUpdateForm({id:id}:{id:string}) {
 const [isLoading, setIsLoading] = useState(false);
 const router = useRouter()
 

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
   
      axios.patch(`/api/booking/${id}`,data).then((res)=>{
        toast({
            variant:'default',
            description:`🎉 Booking is ${data.status}`
        })
        router.push(`/dashboard/bookings/`);
    }).catch((err)=>{
        console.log(err)
        toast({
            variant:'danger',
            description:"Something went Wrong"
        })
        setIsLoading(false);
  
})
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Booking Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Confirmed">Confirm</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Cancelled">Cancel</SelectItem>
                  <SelectItem value="ToCancel">Cancel Pending</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the status of the booking
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit">Confirm</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
