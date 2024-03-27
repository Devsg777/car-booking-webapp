"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IoCall, IoMail, IoPerson } from "react-icons/io5";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please provide a valid email." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Please provide a valid phone number." }),
  message: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(160, {
      message: "Messeage must not be longer than 30 characters.",
    }),
});

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 h-full">
        <div className="grid grid-cols-2 gap-3 w-[80%] lg:w-full px-4 py-10 rounded-2xl shadow-2xl border-2 m-auto">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name"  {...field} className="bg-slate-100 h-12 rounded-none font-italic" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last Name"  {...field} className="bg-slate-100 h-12 rounded-none font-italic" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  
                  <FormControl>
                    <Input placeholder="Email" {...field}   className="bg-slate-100 h-12 rounded-none"  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
            <div className="">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    
                    <FormControl>
                    <Input  {...field}  className="bg-slate-100 rounded-none h-12" placeholder="Phone Number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                   
                      <FormControl>
                        <Textarea
                          placeholder="Message"
                          className="resize-none bg-slate-100 rounded-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="col-span-2 bg-emerald-500 h-12 w-32" type="submit">Send Message</Button>
        </div>
        
      </form>
    </Form>
  );
}
